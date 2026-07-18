import AdminSearch from "../Common/AdminSearch"

function ProductFilter() {
    return (
        <>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-12 gap-4 bg-white rounded-2xl 
                            shadow-sm p-6">

                {/* Search */}
                <div className="md:col-span-6">
                    <AdminSearch placeholder="Search products..." />
                </div>

                {/* Category */}
                <div className="md:col-span-3">
                    <select
                        name="category"
                        id="category"
                        className="w-full h-12 rounded-xl border border-gray-300 bg-white px-4 
                                    text-sm text-slate-900 outline-none transition 
                                    focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                    >
                        <option value="">Category</option>
                        <option value="electronic">Electronic</option>
                        <option value="beauty">Beauty</option>
                        <option value="fashion">Fashion</option>
                        <option value="sports">Sports</option>
                    </select>
                </div>

                {/* Status */}
                <div className="md:col-span-3">
                    <select
                        name="status"
                        id="status"
                        className="w-full h-12 rounded-xl border border-gray-300 bg-white px-4 
                                    text-sm text-slate-900 outline-none transition 
                                    focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                    >
                        <option value="">Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>

            </div>
        </>
    )
}


export default ProductFilter