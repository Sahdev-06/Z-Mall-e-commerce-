
import { CircleAlert, RotateCcw } from "lucide-react";

const ErrorState = ({
  message = "Something went wrong. Please try again.",
  onRetry,
}) => {
  return (
    <div className="flex min-h-[320px] w-full items-center justify-center px-4 py-10">
      <div className="flex w-full max-w-md flex-col items-center text-center">
        {/* Error Icon */}
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 ring-1 ring-red-100">
          <CircleAlert
            size={26}
            strokeWidth={1.7}
            className="text-red-500"
          />
        </div>

        {/* Heading */}
        <h2 className="text-base font-semibold tracking-tight text-gray-900">
          Oops! Something went wrong
        </h2>

        {/* Error Message */}
        <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
          {message}
        </p>

        {/* Retry */}
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-gray-800 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-gray-900/20"
          >
            <RotateCcw size={15} strokeWidth={2} />
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorState;