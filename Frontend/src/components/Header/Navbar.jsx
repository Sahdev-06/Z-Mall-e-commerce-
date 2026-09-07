import { Link } from "react-router-dom"
import { Menu } from 'lucide-react';
import { useState } from 'react';
import Logo from "./Logo"
import TopBar from "./TopBar"
import SearchBar from "./SearchBar"
import UserAction from "./UserAction"
import MenuSlidebar from './MenuSlidebar';

function Navbar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    return (
        <>
            <nav className="sticky top-0 left-0 bg-white z-50 w-full border-b border-gray-200
                        py-3 md:py-4">
                <div className="flex flex-col md:flex-row md:items-center mx-auto w-full px-4 md:px-6">


                    <div className='flex items-center justify-between w-full md:contents'>
                        <button
                            className='md:hidden'
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <Menu className='w-6 h-6' />
                        </button>

                        <div className='md:order-1'>
                            <Logo />
                        </div>

                        <div className='md:order-3'>
                            <UserAction />
                        </div>
                    </div>

                    <div className="mt-3 w-full flex-1 md:order-2 md:mt-0 md:mx-8">
                        <SearchBar />
                    </div>

                </div>

                {/* Sidebar */}
                <MenuSlidebar
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                />
            </nav>
        </>
    )
}


export default Navbar