import { SquarePen, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function SubCategoryTableRow({ _id, name, slug, category, status, modal, selectedSubCategory }) {
    const navigate = useNavigate()

    function handleNavigate() {
        navigate(`/admin/sub-category/edit/${_id}`)
    }

    function handleDelete() {
        selectedSubCategory({
            _id,
            name
        })
        modal(true)
    }

    return (
        <>
            <tr>
                <td className="px-6 py-4">
                    <div className="flex flex-col">
                        <span className="font-semibold text-slate-900">
                            {name}
                        </span>

                        <span className="text-sm text-gray-500">
                            {slug}
                        </span>
                    </div>
                </td>
                <td className="px-6 py-4">
                    <span className="text-sm text-gray-500 mt-1">
                        {category}
                    </span>
                </td>
                <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-full bg-green-100
                                    text-green-700 px-3 py-1.5 text-xs font-medium">
                        {status ? "Active" : "Inactive"}
                    </span>
                </td>
                <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                        <button 
                            className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition"
                            onClick={handleNavigate}
                        >
                            <SquarePen className="w-4 h-4"/>
                        </button>
                        <button 
                            className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition"
                            onClick={handleDelete}
                        >
                            <Trash2 className="w-4 h-4"/>
                        </button>
                    </div>
                </td>
            </tr>
        </>
    )
}


export default SubCategoryTableRow