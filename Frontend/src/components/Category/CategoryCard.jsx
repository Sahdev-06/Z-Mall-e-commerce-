
function CategoryCard({ name, image, onClick }) {
    return (
        <>
            <button
            type="button"
            onClick={onClick}
            className="
                group
                block
                w-full
                overflow-hidden
                rounded-xl
                bg-white
                text-left
                shadow-sm
                transition
                duration-200
                hover:-translate-y-0.5
                hover:shadow-md
                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-orange-500
                focus-visible:ring-offset-2
            "
        >
            {/* Image */}
            <div className="aspect-square w-full overflow-hidden bg-slate-100">
                <img
                    src={image}
                    alt={name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
            </div>

            {/* name */}
            <div className="px-2 py-3 text-center sm:px-3">
                <h3 className="truncate text-sm font-medium text-slate-800 sm:text-base">
                    {name}
                </h3>
            </div>
        </button>
        </>
    )
}


export default CategoryCard