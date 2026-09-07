import { ShieldCheck, ShieldOff } from "lucide-react";

function UserAccountStatus() {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-5">
        <h2 className="text-base font-semibold text-[#0B1F3A]">
          Account Status
        </h2>

        <p className="mt-1 text-xs text-gray-500">
          Manage this customer's account access.
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
            <ShieldCheck size={19} />
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-800">
              Account is Active
            </p>

            <p className="mt-0.5 text-xs text-gray-500">
              This user can log in and place orders.
            </p>
          </div>
        </div>

        <button
          type="button"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-4 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500/10"
        >
          <ShieldOff size={17} />
          Block User
        </button>
      </div>
    </section>
  );
}

export default UserAccountStatus;