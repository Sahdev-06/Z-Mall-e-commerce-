

const ConfirmationModal = ({ title, subtitle, onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-black/40 px-4 
                py-6 backdrop-blur-sm sm:px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl sm:p-6 md:max-w-lg">
        {/* Title */}
        <h2 className="text-center text-xl font-semibold leading-7 text-gray-900 sm:text-2xl sm:leading-8">
          { title }
        </h2>

        {/* Subtitle */}
        <p className="mx-auto mt-3 max-w-sm text-center text-sm leading-6 text-gray-500 sm:text-base">
          { subtitle }
        </p>

        {/* Buttons */}
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={onCancel}
            className="w-full rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium 
                        text-gray-700 transition-colors hover:bg-gray-100 focus:outline-none 
                        focus:ring-2 focus:ring-gray-300 sm:w-auto"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="w-full rounded-lg bg-red-600 px-5 py-3 text-sm font-medium text-white 
                        transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 
                        focus:ring-red-500 focus:ring-offset-2 sm:w-auto"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
