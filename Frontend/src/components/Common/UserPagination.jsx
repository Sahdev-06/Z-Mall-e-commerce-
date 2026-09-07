import { ChevronLeft, ChevronRight } from "lucide-react";

function UserPagination({
    currentPage,
    totalPage,
    setPage,
}) {
    const pages = Array.from(
        { length: totalPage },
        (_, index) => index + 1
    );

    return (
        <nav
            aria-label="Pagination"
            className="mt-10 flex w-full items-center justify-center px-4 sm:px-6"
        >
            <div
                className="
                    flex
                    max-w-full
                    items-center
                    gap-1
                    overflow-x-auto
                    py-1

                    [&::-webkit-scrollbar]:hidden
                    [-ms-overflow-style:none]
                    [scrollbar-width:none]
                "
            >
                {/* Previous */}
                <button
                    type="button"
                    aria-label="Previous page"
                    onClick={() => setPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="
                        inline-flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        bg-slate-900
                        text-white
                        transition-colors
                        hover:bg-slate-950
                        disabled:cursor-not-allowed
                        disabled:opacity-40
                        sm:h-10
                        sm:w-10
                    "
                >
                    <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>

                {/* Pages */}
                {pages.map((pageNumber) => (
                    <button
                        key={pageNumber}
                        type="button"
                        aria-current={
                            currentPage === pageNumber
                                ? "page"
                                : undefined
                        }
                        onClick={() => setPage(pageNumber)}
                        className={`
                            inline-flex
                            h-9
                            min-w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-lg
                            border
                            px-2
                            text-sm
                            font-medium
                            transition-colors

                            sm:h-10
                            sm:min-w-10

                            ${
                                currentPage === pageNumber
                                    ? `
                                        border-orange-500
                                        bg-orange-500
                                        text-white
                                      `
                                    : `
                                        border-orange-500
                                        bg-white
                                        text-slate-900
                                        hover:bg-orange-500
                                        hover:text-white
                                      `
                            }
                        `}
                    >
                        {pageNumber}
                    </button>
                ))}

                {/* Next */}
                <button
                    type="button"
                    aria-label="Next page"
                    onClick={() => setPage(currentPage + 1)}
                    disabled={currentPage === totalPage}
                    className="
                        inline-flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        bg-slate-900
                        text-white
                        transition-colors
                        hover:bg-slate-950
                        disabled:cursor-not-allowed
                        disabled:opacity-40
                        sm:h-10
                        sm:w-10
                    "
                >
                    <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
            </div>
        </nav>
    );
}

export default UserPagination;