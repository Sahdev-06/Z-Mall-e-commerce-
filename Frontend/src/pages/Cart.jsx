import { useState, useEffect } from "react"
import { getCartItems, removeCartItem, removeAllCartItems } from "../services/cartService.js"
import { useCart } from "../context/CartContext.jsx"
import CartList from "../components/Cart/CartList"
import OrderSummary from "../components/Cart/OrderSummary"
import Loading from "../components/Common/Loading.jsx"
import ErrorState from "../components/Common/ErrorState.jsx"
import EmptyState from "../components/Common/EmptyState.jsx"
import FixedCheckoutBar from "../components/Cart/FixedCheckoutBar.jsx"
import Breadcrumb from "../components/Common/Breadcrumb"

function Cart() {
    const { cartItems, loading, error, handleRemoveCartItem } = useCart();

    if (loading) {
        return <Loading />
    }

    if (error) {
        return <ErrorState message={error} />
    }

    if (cartItems.length === 0) {
        return <EmptyState
            title={"Your cart is empty"}
            subtitle={"Browse our products and add your favorite items to get started"}
        />
    }


    return (
        <>
            <main className="min-h-screen bg-slate-50">
                <Breadcrumb />

                <div className="mx-auto w-full max-w-7xl px-4 py-6 pb-24 sm:px-6 sm:py-8 lg:px-8 lg:pb-8">
                    {/* Page Header */}
                    <div className="mb-6 sm:mb-8">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                            Shopping Cart
                        </h1>
                    </div>

                    {/* Cart layout */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_380px] 
                                    lg:items-start lg:gap-8">
                        {/* Left items */}
                        <section className="min-w-0">
                            <CartList carts={cartItems} removeItem={handleRemoveCartItem} />
                        </section>

                        {/* Right - Order summary */}
                        <aside className="min-w-0 lg:sticky lg:top-[88px]">
                            <OrderSummary 
                                btnText={"Proceed to Checkout"}
                                navigateTo={"/checkout/address"}
                                state={{
                                    checkoutType : "cart"
                                }}
                            />
                        </aside>
                    </div>
                </div>

                {/* Mobile + Tablet Fixed Checkout */}
                <FixedCheckoutBar 
                    btnText={"Proceed to Checkout"}
                    navigateTo={"/checkout/address"}
                    state={{
                        checkoutType : "cart"
                    }}
                />
            </main>
        </>
    )
}


export default Cart