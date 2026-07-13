

function ListingHeader() {
    return (
        <>
            <div className="flex justify-between items-centerr">
                <div className="flex flex-col gap-1">
                    <h2 className="text-3xl font-bold text-slate-900">
                        Electronics
                    </h2>
                    <p className="text-gray-500">
                        Showing 32 products
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <span>Sort By: </span>
                    <select className="border rounded-lg px-4 py-2 outline-none cursor-pointer bg-white">
                        <option value="newest">Newest</option>
                        <option value="price-low-high">Price: Low to High</option>
                        <option value="price-high-low">Price: High to Low</option>
                        <option value="discount">Discount</option>
                    </select>
                </div>
            </div>
        </>
    )
}


export default ListingHeader