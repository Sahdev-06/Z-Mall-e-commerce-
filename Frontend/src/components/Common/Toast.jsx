import { CircleCheck, CircleX, X } from "lucide-react";
import { useToast } from "../../context/ToastContext";

function Toast() {

    const { toast, hideToast } = useToast();

    if (!toast.message) return null;

    const isSuccess = toast.type === "success";

    return (
        <div className="fixed top-5 right-5 z-50">
            <div className={`
                flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg
                bg-white border
                ${isSuccess ? "border-green-500" : "border-red-500"}
            `}>

                {isSuccess ? (
                    <CircleCheck className="text-green-500" />
                ) : (
                    <CircleX className="text-red-500" />
                )}

                <p className="text-sm font-medium text-slate-900">
                    {toast.message}
                </p>

                <button
                    onClick={hideToast}
                    className="ml-2 text-gray-500 hover:text-gray-800"
                >
                    <X size={18} />
                </button>

            </div>
        </div>
    );
}

export default Toast;