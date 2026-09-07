import { Download, UserPlus } from "lucide-react";

function UsersPageHeader() {
  return (
    <div className="mb-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0B1F3A] sm:text-3xl">
            Users
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage registered customers and their accounts.
          </p>
        </div>
      </div>
    </div>
  );
}

export default UsersPageHeader;