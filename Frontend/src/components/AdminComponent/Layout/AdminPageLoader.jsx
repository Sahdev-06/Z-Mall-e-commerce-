import { LoaderCircle } from "lucide-react";

const AdminPageLoader = () => {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
      <div className="flex flex-col items-center">
        <LoaderCircle
          size={32}
          strokeWidth={2}
          className="animate-spin text-[#0B1F3A]"
        />

        <p className="mt-3 text-sm font-medium text-gray-500">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default AdminPageLoader;