import { Link } from "react-router-dom"
import Logo from "./Logo"
import TopBar from "./TopBar"
import SearchBar from "./SearchBar"
import UserAction from "./UserAction"

function Navbar() {
    return (
        <>  
            <div className="flex gap-8 px-8 items-center h-24 bg-white shadow-sm">
                <Logo theme={"text-slate-900 font-bold text-2xl"}/>
                <div className="grow">
                    <SearchBar />
                </div>
                <UserAction />
            </div>
        </>
    )
}


export default Navbar