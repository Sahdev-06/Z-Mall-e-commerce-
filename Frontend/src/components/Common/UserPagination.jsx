import { ChevronLeft, ChevronRight } from 'lucide-react';

function UserPagination({ currentPage, totalPage, setPage }) {
    const pages = Array.from(
        { length: totalPage },
        (_, index) => index + 1
    );
    return (
        <>
            <div className='flex items-center gap-2'>
                <button
                    className='flex items-center justify-center w-10 h-10  
                           rounded-lg bg-slate-900 hover:bg-slate-950'
                    onClick={() => setPage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <ChevronLeft className='w-5 h-5 text-white' />
                </button>

                {
                    pages.map(pageNumber => (
                        <button
                            key={pageNumber}
                            className={`w-10 h-10 border border-orange-500 rounded-lg text-sm
                                text-slate-900 hover:bg-orange-500 hover:text-white
                                ${currentPage === pageNumber ? "bg-orange-500 text-white" : ""}`}
                            onClick={() => setPage(pageNumber)}
                        >
                            {pageNumber}
                        </button>
                    ))
                }
            
                <button
                    className='flex items-center justify-center w-10 h-10
                           rounded-lg bg-slate-900 hover:bg-slate-950'
                    onClick={() => setPage(currentPage + 1)}
                    disabled={currentPage === totalPage}
                >
                    <ChevronRight className='w-5 h-5 text-white' />
                </button>
            </div>
        </>
    )
}



export default UserPagination