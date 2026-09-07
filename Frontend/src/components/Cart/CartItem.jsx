import { Minus, Plus, Trash2 } from "lucide-react";
import { useState } from 'react';
import { updateCartItemQty } from '../../services/cartService.js';
import { useCart } from '../../context/CartContext.jsx';

function CartItem({ _id, removeItem, image, name, price, qty }) {
    const { handleIncreaseQty, handleDecreaseQty } = useCart()

    return (
        <>
            <article className="flex gap-3 border-b border-neutral-200 py-4 sm:gap-4 sm:py-5">
                {/* Product Image */}
                <div className="size-24 shrink-0 overflow-hidden rounded-lg bg-neutral-100 
                                sm:size-28 md:size-32">
                    <img 
                        src={image}
                        alt={name}
                        className="size-full object-cover"
                    />
                </div>

                {/* Product Details */}
                <div className="flex min-w-0 flex-1 flex-col">
                    {/* Product Info */}
                    <div className="min-w-0">
                        <h3 className="line-clamp-2 text-sm font-medium text-neutral-900 sm:text-base">
                            {name}
                        </h3>
                        <p className="mt-2 text-sm font-semibold text-neutral-900 sm:text-base">
                            ₹{price.toLocaleString('en-IN')}
                        </p>
                    </div>
                    
                    {/* Bottom actions */}
                    <div className='flex items-center justify-between mt-5 gap-5'>
                        {/* Quantity */}
                        <div className="flex h-9 items-center rounded-md border border-neutral-200">
                            <button 
                                type="button"
                                aria-label="Decrease quantity"
                                onClick={() => handleDecreaseQty(_id)}
                                disabled={qty === 1}
                                className="flex size-8 items-center justify-center text-neutral-600 
                                            transition-colors hover:bg-neutral-50"
                            >
                                <Minus className="size-3.5" />
                            </button>
                            <span className="w-8 text-center text-sm font-medium text-neutral-900">
                                {qty}
                            </span>
                            <button 
                                type="button"
                                aria-label="Increase quantity"
                                onClick={() => handleIncreaseQty(_id)}
                                className="flex size-8 items-center justify-center text-neutral-600 
                                            transition-colors hover:bg-neutral-50"
                            >
                                <Plus className="size-3.5" />
                            </button>
                        </div>

                        {/* Delete */}
                        <button
                            type="button"
                            aria-label={`Remove ${name}`}
                            onClick={() => removeItem(_id)}
                            className="flex size-9 items-center justify-center rounded-md text-neutral-400 
                                        transition-colors hover:bg-neutral-100 hover:text-red-500"
                        >
                            <Trash2 className="size-4" />
                        </button>
                    </div>
                </div>
            </article>
        </>
    )
}


export default CartItem