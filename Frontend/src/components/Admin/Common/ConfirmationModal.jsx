import { TriangleAlert } from 'lucide-react';

function ConfirmationModal({ isOpen, title, message, onCancel, onConfirm }) {
    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center 
                             bg-black/50 backdrop-blur-sm">
                <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-2xl">
                    <div className="flex justify-center">
                        <TriangleAlert className="h-12 w-12 text-red-500" />
                    </div>
                    <p className='mt-4 text-xl text-center font-semibold text-gray-900'>
                        {title}
                    </p>
                    <p className="mt-2 text-sm text-center text-gray-600 leading-6">
                        {message}
                    </p>
                    <div className="mt-6 flex justify-center gap-3">
                        <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm 
                                    font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
                        <button className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium 
                                    text-white hover:bg-red-700 transition-colors"
                                onClick={onConfirm}
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}


export default ConfirmationModal