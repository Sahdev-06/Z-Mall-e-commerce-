import SubCategoryTableRow from "./SubCategoryTableRow"

function SubCategoryTable({ subCategories, modal, selectedSubCategory }) {
    return (
        <div className="mt-6 bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="max-h-[500px] overflow-y-auto">
            <table className="min-w-full">
                <thead className="sticky top-0 bg-slate-50 border-b border-gray-200 z-10">
                    <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider 
                                    text-gray-500">
                            sub category
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider 
                                    text-gray-500">
                            category
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
                        subCategories.map(({ _id, name, slug, category , isActive }) => (
                            <SubCategoryTableRow
                                key={_id}
                                _id={_id}
                                name={name}
                                slug={slug}
                                category={category?.name}
                                status={isActive}
                                modal={modal}
                                selectedSubCategory={selectedSubCategory}
                            />
                        ))
                    }
                </tbody>
            </table>
            </div>
        </div>
    )
}


export default SubCategoryTable