

function PageHeader({ title, subtitle, buttonText }) {
    return (
        <>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-2xl font-bold text-slate-900">
                        {title}
                    </p>
                    <p className="text-sm text-gray-500 font-medium">
                        {subtitle}
                    </p>
                </div>
                <button className="bg-orange-500 text-white px-5 py-2.5 hover:bg-orange-600 transition
                                    rounded-xl">
                    + {buttonText}
                </button>
            </div>
        </>
    )
}



export default PageHeader