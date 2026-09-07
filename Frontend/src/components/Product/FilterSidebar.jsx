import { useState, useEffect } from "react"

function FilterSidebar({ categories, selectedCategories, setSelectedCategories, setPage }) {
    // const [selectedCategories, setSelectedCategories] = useState([])

    const handleCategoryChange = (id) => {
        setPage(1)
        setSelectedCategories(prev => {

            if (prev.includes(id)) {
                return prev.filter(categoryId => categoryId !== id)
            }

            return [...prev, id]
        })
    }

    return (
        <>
            <aside 
                // className="bg-white rounded-2xl shadow-sm p-5 h-fit"
                className="z-40 hidden w-64 border border-gray-200 bg-white lg:block rounded-lg ml-8"
            >
                <div className="px-5 py-6">
                    <h2 className="text-lg font-semibold text-[#0B1F3A]">
                        Filters
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Refine your products
                    </p>

                    {/* Divider */}
                    <div className="my-6 border-t border-gray-200" />
        
                    <section className="mt-7">
                        <h3 className="mb-4 text-sm font-semibold text-[#0B1F3A]">
                            Category
                        </h3>

                        <div className="space-y-3">
                            {
                                categories.map(({ _id, name }) => (
                                    <label
                                        key={_id}
                                        className="flex cursor-pointer items-center gap-3 text-sm 
                                            text-gray-600 hover:text-[#0B1F3A]"
                                    >
                                        <input
                                            type="checkbox"
                                            id={_id}
                                            value={_id}
                                            checked={selectedCategories.includes(_id)}
                                            onChange={() => handleCategoryChange(_id)}
                                            className="h-4 w-4 cursor-pointer rounded border-gray-300 
                                                        accent-orange-500 focus:ring-orange-500"
                                        />
                                        <span>{name}</span>
                                    </label>
                                ))
                            }
                        </div>
                    </section>
                </div>
            </aside>
        </>
    )
}


export default FilterSidebar