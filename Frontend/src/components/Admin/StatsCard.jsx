

function StatsCard({ title, count, icon: Icon}) {
    return (
        <>
            <div className="bg-white rounded-2xl shadow-sm p-6 transition-all duration-300
                            hover:shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center
                                justify-center mb-6">
                    <Icon className="w-6 h-6 text-orange-500"/>
                </div>
                <p className="text-sm font-medium text-gray-500">
                    {title}
                </p>
                <p className="text-3xl font-bold text-slate-900 mt-2">
                    {count}
                </p>
            </div>
        </>
    )
}


export default StatsCard