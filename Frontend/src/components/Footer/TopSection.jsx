import Logo from "../Header/Logo"

function TopSection() {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-8 
                            px-4 sm:px-6 sm:py-12 lg:px-10 py-10">
                <div>
                    {/* <Logo theme={'text-white font-bold text-2xl'}/> */}
                    <Logo color={"text-white"}/>
                    <p className="text-gray-400 mt-4 leading-7">
                        Premium shopping experience with quality products and fast delivery
                    </p>
                </div>

                <div>
                    <p className="font-semibold text-lg mb-4">
                        Quick Links
                    </p>
                    <div className="space-y-3 text-gray-400">
                        <p className="transition hover:text-orange-500">Home</p>
                        <p className="transition hover:text-orange-500">Products</p>
                        <p className="transition hover:text-orange-500">Wishlist</p>
                        <p className="transition hover:text-orange-500">Cart</p>
                    </div>

                </div>

                <div>
                    <p className="font-semibold text-lg mb-4">
                        Customer care
                    </p>
                    <div className="space-y-3 text-gray-400">
                        <p className="transition hover:text-orange-500">Contact</p>
                        <p className="transition hover:text-orange-500">Privacy</p>
                        <p className="transition hover:text-orange-500">Terms</p>
                        <p className="transition hover:text-orange-500">FAQ</p>
                    </div>
                </div>

                <div>
                    <p className="font-semibold text-lg mb-4">
                        Follow Us
                    </p>
                    <div className="space-y-3 text-gray-400">
                        <p className="transition hover:text-orange-500">Github</p>
                        <p className="transition hover:text-orange-500">LinkedIn</p>
                        <p className="transition hover:text-orange-500">X (Twitter)</p>
                    </div>
                </div>
            </div>
        </>
    )
}


export default TopSection