import { ShoppingCart, Star, Zap  } from 'lucide-react';

function ProductionInfo() {
    return (
        <>
            <div className='flex flex-col gap-6'>
                <h3 className="text-4xl text-slate-900 font-bold leading-tight">
                    Wireless Headphones
                </h3>
                <div className='flex items-center gap-2'>
                    <Star className='w-5 h-5 fill-yellow-400 text-yellow-400'/>
                    <span className='text-gray-600'>
                        4.5 (254 Reviews)
                    </span>
                </div>
                <div className="flex items-center gap-3">
                    <p className="font-bold text-3xl text-slate-900">
                        ₹ 3,999
                    </p>
                    <p className='bg-orange-100 text-orange-600 text-sm font-medium px-3 py-1
                                    rounded-full'>
                        Discount
                    </p>
                </div>
                <p className='inline-flex self-start bg-green-100 text-green-700 font-medium
                                px-3 py-1 rounded-full'>
                    Stock
                </p>
                <h3 className='text-lg font-semibold text-slate-900'>
                    Description
                </h3>
                <p className='text-gray-700 leading-7'>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex porro consectetur fuga alias soluta possimus!
                </p>
                <hr className='border-t border-gray-200'/>
                <div className='flex flex-col md:flex-row gap-4'>
                    <button className='flex flex-1 items-center justify-center gap-2 bg-orange-500
                                        hover:bg-orange-600 text-white font-semibold py-3 rounded-xl
                                        transition duration-300'>
                        <ShoppingCart className='w-6 h-6'/> Add to Cart
                    </button>
                    <button className='flex flex-1 items-center justify-center gap-2 bg-slate-900
                                        hover:bg-slate-800 text-white font-semibold py-3 rounded-xl
                                        transition duration-300'>
                        <Zap /> Buy Now
                    </button>
                </div>
            </div>
        </>
    )
}


export default ProductionInfo