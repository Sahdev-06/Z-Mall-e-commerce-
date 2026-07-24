import { TriangleAlert } from 'lucide-react';

function ErrorState({ message }) {
    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
                    <TriangleAlert className="w-10 h-10 text-red-600" />
                </div>

                <h2 className="mt-6 text-2xl font-bold text-red-600">
                    Oops! Something went wrong
                </h2>

                <p className="mt-2 text-gray-500 text-center max-w-md">
                    {message}
                </p>

                <button className="mt-6 px-5 py-2 bg-red-600 text-white rounded-lg 
                            hover:bg-red-700 transition">
                    Try Again
                </button>
            </div>
        </>
    )
}



export default ErrorState