import Logo from "../Header/Logo"
import { Link } from "react-router-dom"

function TopSection() {
    const github = "https://github.com/Sahdev-06"
    const linkedIn = "https://www.linkedin.com/in/sahdev-kumar-a092a539a/"
    const twitter = "https://x.com/sahdev06"
    
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
                    <div className="space-y-3 flex flex-col text-gray-400">
                        <Link 
                            to="/"
                            className="transition hover:text-orange-500">
                            Home
                        </Link>
                        <Link 
                            to="/products"
                            className="transition hover:text-orange-500">
                            Products
                        </Link>
                        <Link 
                            className="transition hover:text-orange-500">
                            Wishlist
                        </Link>
                        <Link 
                            to="/cart"
                            className="transition hover:text-orange-500">
                            Cart
                        </Link>
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
                    <div className="space-y-3 flex flex-col text-gray-400">
                        <Link 
                            to={github}
                            className="transition hover:text-orange-500">
                            Github
                        </Link>
                        <Link 
                            to={linkedIn}
                            className="transition hover:text-orange-500">
                            LinkedIn
                        </Link>
                        <Link 
                            to={twitter}
                            className="transition hover:text-orange-500">
                            X (Twitter)
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}


export default TopSection