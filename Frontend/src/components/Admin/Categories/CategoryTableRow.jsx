import { SquarePen, Trash2 } from 'lucide-react';
import headphone from "../../../assets/headphone.png"

function CategoryTableRow({ image, name, slug, description, status }) {
    return (
        <>
            <tr>
                <td className="px-6 py-4">
                    <img
                        src={image}
                        className="h-14 w-14 rounded-lg object-cover border border-gray-200"
                    />
                </td>
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
                <td className="px-6 py-4 max-w-[250px] truncate text-sm text-slate-600">
                    <span>
                        {description}
                    </span>
                </td>
                <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-full bg-green-100
                                    text-green-700 px-3 py-1.5 text-xs font-medium">
                        {status}
                    </span>
                </td>
                <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                        <button className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition">
                            <SquarePen className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition">
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </td>
            </tr>
        </>
    )
}


export default CategoryTableRow