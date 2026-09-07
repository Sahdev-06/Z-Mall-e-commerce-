import { Eye, MoreVertical, Pencil, ShieldCheck, ShieldOff } from "lucide-react";


function UsersTable({ users, currentPage, setCurrentPage, totalPages, totalUsers, limit }) {
  const start = users.length === 0
    ? 0
    : (currentPage - 1) * limit + 1;

  const end = (currentPage - 1) * limit + users.length;

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4 sm:px-6">
        <div>
          <h2 className="text-base font-semibold text-[#0B1F3A]">
            All Users
          </h2>

          <p className="mt-0.5 text-xs text-gray-500">
            {users.length} users found
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[950px] text-left">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                User
              </th>

              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Phone
              </th>

              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Status
              </th>

              {/* <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                Actions
              </th> */}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {users.map(({ _id, fullName, email, phone, isBlocked }) => (
              <tr
                key={_id}
                className="transition-colors hover:bg-gray-50/70"
              >
                {/* User */}
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {fullName}
                    </p>

                    <p className="mt-0.5 text-xs text-gray-500">
                      {email}
                    </p>
                  </div>
                </td>

                {/* Phone */}
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600">
                    {phone}
                  </span>
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                      isBlocked === false
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {isBlocked === false ? (
                      <ShieldCheck size={13} />
                    ) : (
                      <ShieldOff size={13} />
                    )}

                    {isBlocked === false ? "Active" : "Blocked"}
                  </span>
                </td>

                {/* Actions */}
                {/* <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-blue-50 hover:text-[#0B1F3A]"
                      aria-label={`View ${fullName}`}
                    >
                      <Eye size={16} />
                    </button>

                    <button
                      type="button"
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-[#0B1F3A]"
                      aria-label={`Edit ${fullName}`}
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      type="button"
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-red-50 hover:text-red-600"
                      aria-label={`More actions for ${fullName}`}
                    >
                      <MoreVertical size={17} />
                    </button>
                  </div>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex flex-col gap-3 border-t border-gray-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-xs text-gray-500">
          Showing{" "}
          <span className="font-medium text-gray-700">
            {start}
          </span>{" "}
          to{" "}
          <span className="font-medium text-gray-700">
            {end}
          </span>{" "}
          of{" "}
          <span className="font-medium text-gray-700">
            {totalUsers}
          </span>{" "}
          users
        </p>

        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 
            transition hover:bg-gray-50"
          >
            Previous
          </button>

          <button
            type="button"
            className="rounded-lg bg-[#0B1F3A] px-3 py-2 text-xs font-medium text-white"
          >
            { currentPage }
          </button>

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 
            transition hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default UsersTable;