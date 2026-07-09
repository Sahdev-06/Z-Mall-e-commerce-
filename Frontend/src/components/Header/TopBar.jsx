import { Truck } from 'lucide-react'

function TopBar() {
    return (
        <>
            <div 
                className="bg-slate-900 flex text-white justify-between py-2 px-4 items-center text-sm">
                <div className='flex items-center gap-2'>
                    <Truck />
                    <span>Free Delivery</span>
                </div>
                <div>
                    <span>24/7 Support</span>
                </div>
                <div>
                    <span>Fast Shipping</span>
                </div>
            </div>
        </>
    )
}


export default TopBar