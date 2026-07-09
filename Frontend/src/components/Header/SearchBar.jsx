import { Search } from 'lucide-react';

function SearchBar() {
    return (
        <>
            <div className='flex items-center relative shadow-sm'>
                <input 
                    placeholder='Search for products or category'
                    className='border border-gray-300 rounded-md w-full py-2 pl-4 pr-20 
                        focus:outline-none placeholder:text-gray-400 focus:border-orange-500'
                />
                <button className='bg-orange-500 h-full py-2 px-4 
                            text-white rounded-r-md absolute right-0'>
                    <Search />
                </button>
            </div>
        </>
    )
}


export default SearchBar