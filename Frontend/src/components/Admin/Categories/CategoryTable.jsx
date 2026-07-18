import CategoryTableRow from "./CategoryTableRow"
import { categoryTable } from "../../../Dummy/dummyData"

function CategoryTable() {
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
                        categoryTable.map(({ id, image, name, slug, description, status }) => (
                            <CategoryTableRow
                                key={id}
                                image={image}
                                name={name}
                                slug={slug}
                                description={description}
                                status={status}
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