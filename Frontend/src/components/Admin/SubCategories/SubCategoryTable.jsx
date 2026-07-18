import { subCategoryTable } from "../../../Dummy/dummyData"
import SubCategoryTableRow from "./SubCategoryTableRow"

function SubCategoryTable() {
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
                        subCategoryTable.map(({ id, name, slug, category, status }) => (
                            <SubCategoryTableRow
                                key={id}
                                name={name}
                                slug={slug}
                                category={category}
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


export default SubCategoryTable