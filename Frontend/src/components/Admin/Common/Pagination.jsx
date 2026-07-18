import { ChevronLeft, ChevronRight } from 'lucide-react';

function Pagination() {
    return (
        <>
            <div className='mt-6 flex flex-col gap-4 md:flex-row items-center justify-between'>
                <p className='text-sm text-gray-500'>
                    Showing 1 to 10 of 120 products
                </p>
                <div className='flex items-center gap-2'>
                    <button className='w-10 h-10 rounded-lg border border-gray-300 text-sm
                                        hover:bg-orange-50 transition flex items-center justify-center'>
                        <ChevronLeft className='w-5 h-5'/>
                    </button>
                    <button className='w-10 h-10 rounded-lg bg-orange-500 text-white
                                        border border-orange-500 text-sm transition'>
                        1
                    </button>
                    <button className='w-10 h-10 rounded-lg border border-gray-300 text-sm
                                        hover:bg-orange-50 transition'>
                        2
                    </button>
                    <button className='w-10 h-10 rounded-lg border border-gray-300 text-sm
                                        hover:bg-orange-50 transition'>
                        3
                    </button>
                    <button className='w-10 h-10 rounded-lg border border-gray-300 text-sm
                                        hover:bg-orange-50 transition flex items-center justify-center'>
                        <ChevronRight className='w-5 h-5'/>
                    </button>
                </div>
            </div>
        </>
    )
}



export default Pagination