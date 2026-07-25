import CategoryTableRow from "./CategoryTableRow"


function CategoryTable({ categories, modal, selectedCategory }) {
    return (
        <div className="mt-6 bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="max-h-[500px] overflow-y-auto">
            <table className="min-w-full">
                <thead className="sticky top-0 bg-slate-50 border-b border-gray-200 z-10">
                    <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider 
                                    text-gray-500">
                            image
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider 
                                    text-gray-500">
                            category
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider 
                                    text-gray-500">
                            description
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider 
                                    text-gray-500">
                            status
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider 
                                    text-gray-500">
                            actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        categories.map(({ _id, image, name, slug, description, isActive }) => (
                            <CategoryTableRow
                                key={_id}
                                _id={_id}
                                image={image}
                                name={name}
                                slug={slug}
                                description={description}
                                status={isActive}
                                modal={modal}
                                selectedCategory={selectedCategory}
                            />
                        ))
                    }
                </tbody>
            </table>
            </div>
        </div>
    )
}


export default CategoryTable