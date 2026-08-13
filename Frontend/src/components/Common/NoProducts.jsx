


function NoProducts() {
    return (
        <div className="flex flex-1 min-h-[400px] items-center justify-center">
            <div className="text-center">
                <p className="text-xl text-slate-900 font-semibold">
                    No products found
                </p>
                <p className="text-gray-700">
                    Try changing your search or filters.
                </p>
            </div>
        </div>
    )
}



export default NoProducts