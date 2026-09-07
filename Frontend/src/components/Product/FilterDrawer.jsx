import { useEffect } from "react";
import { X } from "lucide-react";
import { useLocation } from "react-router-dom";


function FilterDrawer({ categories, isOpen, onClose, setPage, selectedCategories, 
    setIsFilterOpen, setSelectedCategories }) {

    const location = useLocation();

    // Prevent body scroll while drawer is open
    useEffect(() => {
        if (!isOpen) return;

        document.body.style.overflow = "hidden";

        return () => {
        document.body.style.overflow = "";
        };
    }, [isOpen]);

    useEffect(() => {
        setIsFilterOpen(false)
    }, [location])

    const handleCategoryChange = (id) => {
        setPage(1)
        setSelectedCategories(prev => {

            if (prev.includes(id)) {
                return prev.filter(categoryId => categoryId !== id)
            }

            return [...prev, id]
        })
    }


    return (
        <div
            className={`
                fixed inset-0 z-50 lg:hidden
                transition-[visibility] duration-300
                ${isOpen ? "visible" : "invisible"}
            `}
            >
            {/* Overlay */}
            <div
                className={`
                absolute inset-0 bg-black/40
                transition-opacity duration-300
                ${isOpen ? "opacity-100" : "opacity-0"}
                `}
                onClick={onClose}
            />

            {/* Drawer */}
            <aside
                className={`
                absolute inset-y-0 left-0
                flex w-[65%] max-w-sm flex-col
                bg-white shadow-2xl
                transform transition-transform duration-300 ease-out
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
                `}
            >
                {/* Header */}
                <div className="flex shrink-0 items-center justify-between border-b border-gray-200 px-5 py-4">
                <div>
                    <h2 className="text-lg font-semibold text-[#0B1F3A]">
                        Filters
                    </h2>

                    <p className="mt-0.5 text-sm text-gray-500">
                        Refine your products
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close filters"
                    className="
                    inline-flex h-9 w-9
                    items-center justify-center
                    rounded-lg
                    text-gray-500
                    transition-colors
                    hover:bg-gray-100
                    hover:text-[#0B1F3A]
                    focus:outline-none
                    focus:ring-2 focus:ring-[#0B1F3A]/10
                    "
                >
                    <X className="h-5 w-5" />
                </button>
                </div>

                {/* Filter Content */}
                <div className="flex-1 overflow-y-auto px-5 py-6">
                    <section>
                        <h3 className="mb-4 text-sm font-semibold text-[#0B1F3A]">
                            Categories
                        </h3>

                        <div className="space-y-3">
                            {categories.map(({ _id, name }) => (
                                <label
                                key={_id}
                                className="
                                    flex cursor-pointer items-center gap-3
                                    text-sm text-gray-600
                                    hover:text-[#0B1F3A]
                                "
                                >
                                <input
                                    type="checkbox"
                                    id={_id}
                                    value={_id}
                                    checked={selectedCategories.includes(_id)}
                                    onChange={() => handleCategoryChange(_id)}
                                    className="
                                    h-4 w-4
                                    cursor-pointer
                                    rounded
                                    border-gray-300
                                    accent-orange-500
                                    focus:ring-orange-500
                                    "
                                />

                                <span>{name}</span>
                                </label>
                            ))}
                        </div>
                    </section>
                </div>
            </aside>
        </div>
    );
}



export default FilterDrawer