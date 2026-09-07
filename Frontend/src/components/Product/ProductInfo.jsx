import { ShoppingCart, Star, Zap  } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { addToCart } from '../../services/cartService.js';
import { useCart } from '../../context/CartContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';


function ProductionInfo({ product }) {
    const { refreshCart } = useCart()
    const { _id, name, price, discount, stock, description, } = product

    const { user } = useAuth();
    const { showToast } = useToast();

    const navigate = useNavigate();
    const location = useLocation();

    const handleAddToCart = async (e) => {
        e.preventDefault();

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

    return (
        <>
            <div className='space-y-5'>
                {/* Name + Rating */}
                <div className='space-y-3'>
                    <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl leading-tight">
                        {name}
                    </h1>
                    <div className='flex items-center gap-2'>
                        <Star className='fill-yellow-400 text-yellow-500'/>
                        <span className='text-sm font-medium text-gray-700'>
                            4.5 (254 Reviews)
                        </span>
                    </div>
                </div>

                {/* Price + Discount */}
                <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-slate-900">
                        ₹ {price.toLocaleString('en-IN')}
                    </span>
                    {
                        discount > 0 && (
                            <span className='bg-orange-100 text-orange-500 px-2.5 py-1 text-xs
                                        font-semibold rounded-full'>
                               {discount}% OFF
                            </span>
                        )
                    }
                </div>

                <p className='text-xs inline-flex self-start bg-green-100 text-green-700 font-medium
                                px-3 py-1 rounded-full'>
                    {stock > 0 ? "Instock" : "out of stock"}
                </p>

                {/* Description */}
                <div>
                    <p className='text-xl font-semibold text-slate-900'>
                        Description
                    </p>
                    <p className='text-sm leading-6 text-gray-700 sm:text-base'>
                        {description}
                    </p>
                </div>

                <hr className='border-t border-gray-200'/>

                {/* Action buttons */}
                <div className='flex flex-col gap-3 sm:flex-row'>
                    <button className='w-full bg-orange-500 text-white py-3 px-5 font-semibold
                                    transition-colors hover:bg-orange-600 sm:flex-1 rounded-full'
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </button>
                    <button 
                        onClick={() => navigate("/checkout/address", {
                            state : {
                                checkoutType : "buy-now",
                                productId : _id,
                                quantity : 1,
                            }
                        })}
                        className='w-full bg-slate-900 text-white py-3 px-5 font-semibold
                                    transition-colors hover:bg-slate-700 sm:flex-1 rounded-full'
                    >
                        Buy Now
                    </button>
                </div>
            </div>
        </>
    )
}


export default ProductionInfo