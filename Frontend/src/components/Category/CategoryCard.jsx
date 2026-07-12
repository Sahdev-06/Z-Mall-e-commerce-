
function CategoryCard({ name, image }) {
    return (
        <>
            <div className="flex flex-col items-center gap-5 hover:shadow-lg transition-all
                           duration-300 cursor-pointer p-5 group bg-white rounded-2xl 
                           shadow-sm border border-gray-200 p-4">
                <div className="flex justify-center items-center h-40 mb-5 rounded-xl">
                    <img 
                        src={image} alt="headphone"
                        className=" h-full w-full object-contain transition-transform duration-300
                                    group-hover:scale-110"
                    />
                </div>
                <p className="text-lg font-semibold text-slate-900 text-center">
                    {name}
                </p>
            </div>
        </>
    )
}


export default CategoryCard