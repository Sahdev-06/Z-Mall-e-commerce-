import Logo from "../Header/Logo"

function TopSection() {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 
                            px-6 lg:px-10 py-12">
                <div>
                    <Logo theme={'text-white font-bold text-2xl'}/>
                    <p className="text-gray-400 mt-4 leading-7">
                        Premium shopping experience with quality products and fast delivery
                    </p>
                </div>

                <div>
                    <p className="font-semibold text-lg mb-4">
                        Quick Links
                    </p>
                    <p className="space-y-3 text-gray-400 hover:text-orange-500 transition">
                        Home
                    </p>
                    <p className="space-y-3 text-gray-400 hover:text-orange-500 transition">
                        Products
                    </p>
                    <p className="space-y-3 text-gray-400 hover:text-orange-500 transition">
                        Wishlist
                    </p>
                    <p className="space-y-3 text-gray-400 hover:text-orange-500 transition">
                        Cart
                    </p>
                    
                </div>

                <div>
                    <p className="font-semibold text-lg mb-4">
                        Customer care
                    </p>
                    <p className="space-y-3 text-gray-400 hover:text-orange-500 transition">
                        Contact
                    </p>
                    <p className="space-y-3 text-gray-400 hover:text-orange-500 transition">
                        Privacy
                    </p>
                    <p className="space-y-3 text-gray-400 hover:text-orange-500 transition">
                        Terms
                    </p>
                    <p className="space-y-3 text-gray-400 hover:text-orange-500 transition">
                        FAQ
                    </p>
                </div>

                <div>
                    <p className="font-semibold text-lg mb-4">
                        Follow Us
                    </p>
                    <p className="space-y-3 text-gray-400 hover:text-orange-500 transition">
                        Github
                    </p>
                    <p className="space-y-3 text-gray-400 hover:text-orange-500 transition">
                        Linked
                    </p>
                    <p className="space-y-3 text-gray-400 hover:text-orange-500 transition">
                        X (twitter)
                    </p>
                </div>
            </div>
        </>
    )
}


export default TopSection