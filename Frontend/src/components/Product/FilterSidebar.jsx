import { categories } from "../../Dummy/dummyData.js"

function FilterSidebar() {
    return (
        <>
            <div className="bg-white rounded-2xl shadow-sm p-5 h-fit">
                <h2 className="text-xl font-semibold text-slate-900 mb-6">
                    Filters
                </h2>
                <hr className="border-gray-200 mb-6"/>
                <div className="flex flex-col gap-4">
                    <h3 className="font-semibold  text-lg text-slate-900 mb-4">
                        Category
                    </h3>
                    {
                        categories.map(({ name }) => (
                            <div className="flex items-center gap-4 cursor-pointer" key={name}>
                                <input type="checkbox" id={name} value={name}/>
                                <label htmlFor={name} className="text-gray-700">{name}</label>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}


export default FilterSidebar