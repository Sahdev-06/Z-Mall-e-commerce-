import { useState, useEffect } from "react"
import { getAllAddresses } from "../services/addressService.js"
import { useAddress } from "../context/AddressContext.jsx"
import { useNavigate, useLocation } from "react-router-dom"
import Breadcrumb from "../components/Common/Breadcrumb"
import AddressList from "../components/Checkout/AddressList"
import OrderSummary from "../components/Cart/OrderSummary"
import Loading from "../components/Common/Loading.jsx"
import ErrorState from "../components/Common/ErrorState.jsx"
import EmptyState from "../components/Common/EmptyState.jsx"
import FixedCheckoutBar from "../components/Cart/FixedCheckoutBar.jsx"
import NoAddress from "../components/Common/NoAddress.jsx"

function Checkout() {
    const navigate = useNavigate();
    const location = useLocation();

    const state = location.state

    const { addresses, loading, error } = useAddress();

    if(loading) {
        return <Loading />
    }

    if(error) {
        return <ErrorState message={error}/>
    }

    if(addresses.length === 0) {
        return <NoAddress />
    }

    return (
        <>  
            <Breadcrumb />
            <main className="min-h-screen bg-slate-50">
                <div className="mx-auto w-full max-w-7xl px-4 py-6 pb-24 sm:px-6 
                            sm:py-8 lg:px-8 lg:pb-8">
                    
                    {/* Cart Layout */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_380px] 
                                    lg:items-start lg:gap-8">
                        {/* Left - Items */}
                        <section className="min-w-0">
                            <AddressList addresses={addresses}/>
                        </section>

                        {/* Right - Order Summary */}
                        <aside className="min-w-0 lg:sticky lg:top-[88px]">
                            <OrderSummary 
                                btnText={"Proceed to Pay"}
                                navigateTo={"/checkout/payment"}
                                state={state}
                            />
                        </aside>
                    </div>
                </div>

                {/* Mobile + Tablet Fixed Checkout */}
                <FixedCheckoutBar 
                    btnText={"Proceed to Pay"}
                    navigateTo={"/checkout/payment"}
                    state={state}
                />
                
            </main>
        </>
    )
}


export default Checkout