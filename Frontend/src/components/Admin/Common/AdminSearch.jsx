import { Search } from "lucide-react";

function AdminSearch({
    placeholder = "Search products...",
    value,
    onChange,
}) {
    return (
        <div className="relative flex items-center w-full">
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full rounded-xl border border-gray-300
                           h-12 pl-4 pr-14
                           text-sm text-slate-900
                           placeholder:text-gray-400
                           outline-none transition
                           focus:border-orange-500
                           focus:ring-2
                           focus:ring-orange-200"
            />

            <button
                className="absolute right-1
                           flex h-10 w-10 items-center justify-center
                           rounded-lg
                           bg-orange-500 text-white
                           transition
                           hover:bg-orange-600"
            >
                <Search className="h-5 w-5" />
            </button>
        </div>
    );
}

export default AdminSearch;