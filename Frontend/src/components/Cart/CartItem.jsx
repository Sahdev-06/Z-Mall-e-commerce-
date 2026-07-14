import { Trash } from 'lucide-react';
import headphone from "../../assets/headphone.png"
import { useState } from 'react';

function CartItem({ image, name, price, qty }) {
    const [quantity, setQuantity] = useState(qty)
    return (
        <>
            <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col sm:flex-row
                            justify-between gap-6">
                <div className="w-28 h-28 bg-slate-50 rounded-xl flex items-center justify-center">
                    <img 
                        src={image}
                        className="h-full w-full object-contain"
                    />
                </div>
                
                <div className="flex flex-col justify-center gap-2">
                    <h3 className="text-lg font-semibold text-slate-900">
                        {name}
                    </h3>
                    <p className="text-xl font-bold text-orange-500">
                        ₹ {price}
                    </p>
                    <div className='flex items-center justify-between mt-5 gap-5'>
                        <div className='flex items-center border border-gray-300 rounded-lg
                                        overflow-hidden'>
                            <button 
                                onClick={() => setQuantity(quantity - 1)}
                                className='px-4 py-2 hover:bg-gray-100 transition'
                            >
                                -
                            </button>
                            <span className='px-5 py-2 font-medium border-x border-gray-300'>
                                {quantity}
                            </span>
                            <button 
                                onClick={() => setQuantity(quantity + 1)}
                                className='px-4 py-2 hover:bg-gray-100 transition'
                            >
                                +
                            </button>
                        </div>
                        <div>
                            <button>
                                <Trash className='text-red-500 hover:fill-red-500'/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default CartItem