import { Heart, Star, ShoppingCart } from 'lucide-react';

function ProductCard({ name, discount, price, image}) {
    return (
        <>
            <div className="flex flex-col gap-3 bg-white rounded-2xl group
                            shadow-sm cursor-pointer transition-all duration-300 hover:shadow-lg p-5">
                <div className='flex justify-end mb-2'>
                    <button className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100
                                        transition duration-300">
                        <Heart className='w-5 h-5'/>
                    </button>
                </div>
                <div className="flex justify-center items-center h-56 mb-6">
                    <img
                        src={image} alt="product-image"
                        className="w-full h-full object-contain transition-transform 
                                    group-hover:scale-110 duration-300"
                    />
                </div>
                <span className="font-semibold text-slate-900 text-lg line-clamp-2">
                    {name}
                </span>
                <span className='text-sm text-gray-500 mt-1'>
                    Wireless Bluetooth Headphones
                </span>
                <div className='flex items-center gap-1 mt-3'>
                    <Star className='w-4 h-4'/>
                    <span className='text-sm text-gray-600'>
                        4.5 (254)
                    </span>
                </div>
                <div className='flex items-center gap-2 mt-3'>
                    <span className="text-xl font-bold text-slate-900">
                        ₹ {price}
                    </span>
                    <span className='text-sm text-gray-400 line-through'>
                        ₹999
                    </span>
                    <span className="bg-orange-100 text-orange-600 text-xs 
                                    rounded-full font-medium px-2 py-1">
                        {discount}% OFF
                    </span>
                </div>
                <button className="w-full mt-5 py-3 rounded-xl border border-orange-500
                                    text-orange-500 font-medium hover:bg-orange-500 hover:text-white
                                    transition-all duration-300 flex items-center justify-center gap-3">
                   <ShoppingCart /> Add to Cart
                </button>
            </div>
        </>
    )
}


export default ProductCard