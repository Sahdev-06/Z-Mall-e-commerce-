import { Search } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
    const [search, setSearch] = useState("")
    const navigate = useNavigate()

    const handleSearch = () => {
        const value = search.trim()

        if(!value) return;

        navigate(`/search?q=${encodeURIComponent(value)}`);
    }

    const handleKeyDown = (e) => {
        if(e.key === "Enter") {
            handleSearch()
        }
    }

    return (
        <>
            <div className='flex w-full'>
                <input 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder='Search products...'
                    className="w-full rounded-l-lg border border-gray-300 px-4 py-2 outline-none
                                placeholder:text-gray-400 focus:border-orange-500"
                />
                <button 
                    className='rounded-r-lg bg-orange-500 px-4 py-2 text-white shrink-0 cursor-pointer
                                hover:bg-orange-600 transition'
                    onClick={handleSearch}
                >
                    <Search className='w-5 h-5'/>
                </button>
            </div>
        </>
    )
}


export default SearchBar