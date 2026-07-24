

function Loading() {
    return (
        <>
            <div className="flex items-center justify-center flex-col h-screen">
                <div className="size-12 rounded-full border-4 border-gray-400 border-t-slate-900 
                                animate-spin">
                </div>

                <p className="mt-4 text-gray-600 font-medium">
                    Authenticating...
                </p>
            </div>
        </>
    )
}


export default Loading