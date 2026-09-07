import { ArrowLeft, ShieldCheck, ShieldOff } from "lucide-react";

function UserDetailsHeader() {
  return (
    <div className="mb-6">
      <button
        type="button"
        className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-[#0B1F3A]"
      >
        <ArrowLeft size={17} />
        Back to Users
      </button>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0B1F3A] sm:text-3xl">
            Rahul Sharma
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            rahul@example.com
          </p>
        </div>

        <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
          <ShieldCheck size={15} />
          Active Account
        </div>
      </div>
    </div>
  );
}

export default UserDetailsHeader;