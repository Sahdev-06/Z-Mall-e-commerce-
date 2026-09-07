import { useEffect, useRef, useState } from "react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";

const sortOptions = [
    {
        label: "Price",
        value: "",
    },
    {
        label: "Price: Low to High",
        value: "price-low-high",
    },
    {
        label: "Price: High to Low",
        value: "price-high-low",
    },
];

function ListingHeader({
    sort,
    setSort,
    setPage,
    totalProducts,
    onFilterClick,
}) {
    const [isSortOpen, setIsSortOpen] = useState(false);

    const sortRef = useRef(null);

    /*
     * Close dropdown when clicking outside
     */
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                sortRef.current &&
                !sortRef.current.contains(event.target)
            ) {
                setIsSortOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleOutsideClick
            );
        };
    }, []);

    /*
     * Close dropdown with Escape
     */
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === "Escape") {
                setIsSortOpen(false);
            }
        };

        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener(
                "keydown",
                handleEscape
            );
        };
    }, []);

    /*
     * Select sorting option
     */
    const handleSortSelect = (value) => {
        setSort(value);
        setPage(1);
        setIsSortOpen(false);
    };

    /*
     * Get selected label from actual sort value
     */
    const selectedSort =
        sortOptions.find((option) => option.value === sort)?.label ||
        "Price";

    return (
        <header className="border-b border-gray-200 px-4 md:pb-4 py-4 sm:px-6">
            <div className="flex items-center justify-between gap-4">
                {/* Desktop: Title */}
                <div className="hidden lg:block">
                    <h1 className="text-xl font-semibold text-[#0B1F3A]">
                        Products
                    </h1>

                    {
                        totalProducts > 0 && (
                            <p className="mt-1 text-sm text-gray-500">
                                Total { totalProducts } products
                            </p>
                        )
                    }
                </div>

                {/* Mobile / Tablet: Filter */}
                <button
                    type="button"
                    onClick={onFilterClick}
                    className="
                        inline-flex h-9 items-center gap-2
                        rounded-lg border border-gray-200
                        bg-white px-3
                        text-sm font-medium text-[#0B1F3A]
                        transition-colors
                        hover:bg-gray-50
                        focus:outline-none
                        focus:ring-2
                        focus:ring-[#0B1F3A]/10
                        lg:hidden
                    "
                >
                    <SlidersHorizontal className="h-4 w-4" />
                    Filter
                </button>

                {/* Sort */}
                <div
                    ref={sortRef}
                    className="relative ml-auto"
                >
                    <button
                        type="button"
                        onClick={() =>
                            setIsSortOpen((prev) => !prev)
                        }
                        aria-expanded={isSortOpen}
                        aria-haspopup="listbox"
                        className="
                            inline-flex h-9 items-center gap-2
                            rounded-lg border border-gray-200
                            bg-white px-3
                            text-sm font-medium
                            text-[#0B1F3A]
                            transition-colors
                            hover:border-gray-300
                            focus:outline-none
                            focus:ring-2
                            focus:ring-[#0B1F3A]/10
                        "
                    >
                        <span className="whitespace-nowrap">
                            Sort by: {selectedSort}
                        </span>

                        <ChevronDown
                            className={`
                                h-4 w-4 shrink-0 text-gray-500
                                transition-transform duration-200
                                ${
                                    isSortOpen
                                        ? "rotate-180"
                                        : ""
                                }
                            `}
                        />
                    </button>

                    {/* Dropdown */}
                    {isSortOpen && (
                        <div
                            role="listbox"
                            className="
                                absolute right-0 top-full z-50 mt-2
                                w-52
                                overflow-hidden
                                rounded-lg
                                border border-gray-200
                                bg-white
                                p-1
                                shadow-lg
                            "
                        >
                            {sortOptions.map((option) => (
                                <button
                                    key={option.value || "default"}
                                    type="button"
                                    role="option"
                                    aria-selected={
                                        sort === option.value
                                    }
                                    onClick={() =>
                                        handleSortSelect(
                                            option.value
                                        )
                                    }
                                    className={`
                                        flex w-full items-center
                                        rounded-md px-3 py-2
                                        text-left text-sm
                                        transition-colors
                                        ${
                                            sort === option.value
                                                ? "bg-gray-100 font-medium text-[#0B1F3A]"
                                                : "text-gray-600 hover:bg-gray-50 hover:text-[#0B1F3A]"
                                        }
                                    `}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default ListingHeader;