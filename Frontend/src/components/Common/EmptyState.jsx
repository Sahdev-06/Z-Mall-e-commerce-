

function EmptyState({ title, subtitle}) {
    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen">
                <p className="mt-4 text-gray-800 text-2xl font-bold">
                    {title}
                </p>
                <p className="text-gray-600 font-medium">
                    {subtitle}
                </p>
            </div>
        </>
    )
}


export default EmptyState