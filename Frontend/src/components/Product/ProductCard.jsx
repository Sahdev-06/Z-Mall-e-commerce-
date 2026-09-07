import { Heart, Star, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { addToCart } from '../../services/cartService.js';
import { useCart } from '../../context/CartContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';

function ProductCard({ _id, name, discount, price, images, showBtn=true }) {
    const { user } = useAuth();
    const { showToast } = useToast();

    const { refreshCart } = useCart()
    const navigate = useNavigate();
    const location = useLocation();
    
    function productDetails() {
        navigate(`/product/${_id}`)
    }

    const handleAddToCart = async (e) => {
        e.stopPropagation();

        if(!user) {
            showToast("Please login to add products to cart", "error")
            navigate("/login", {
                state : { from : location}
            })
        }

        const items = [
            {
                productId : _id,
                quantity : 1
            }
        ]

        try {
            const result = await addToCart({ items })
            refreshCart()
            showToast("Added", "success")
        } catch (error) {
            showToast("Item not added", "error")
        }
    }

    function addToWishlist(e) {
        e.stopPropagation();
    }

    return (
        <>
            <article className="min-w-0 flex flex-col border border-gray-200 bg-white rounded-lg"
                onClick={productDetails}
            >
                <div className="aspect-[1/1] sm:aspect-[2/2] overflow-hidden rounded-lg bg-gray-50">
                    <img
                        className="w-full h-full object-contain"
                        src={images[0]} 
                        alt="product-image"
                    />
                </div>
                <div className="mt-3 space-y-2 flex-1 px-2 sm:px-3">                
                    <h2
                        className="h-10 text-sm text-gray-900 font-medium line-clamp-2"
                    >
                        { name }
                    </h2>
                    <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400"/>
                        <span className='text-sm text-gray-600'>
                            4.5
                        </span>
                        <span className='text-xs text-gray-400'>
                            (128)
                        </span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <span className="text-base font-semibold text-gray-900">
                            ₹ {price.toLocaleString('en-IN')}
                        </span>
                        {
                            discount > 0 && (
                                <span className="shrink-0 bg-orange-100 text-orange-500 rounded-full font-medium 
                                            text-xs px-1.5 py-0.5">
                                    {discount}% OFF
                                </span>
                            )
                        }
                    </div>
                </div>
                {showBtn && (<div className='px-2 pb-2 sm:px-3 sm:pb-3'>
                    <button className="w-full hidden md:block bg-orange-500 text-white rounded-lg text-sm
                        font-medium py-2.5 mt-3 transition-colors hover:bg-slate-900 cursor-pointer"
                    onClick={handleAddToCart}
                    >
                        Add to Cart
                    </button>
                </div>)}
            </article>
        </>
    )
}


export default ProductCard