import {
  CheckCircle2,
  MoreVertical,
  Pencil,
  Trash2,
  XCircle,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

function SubCategoriesTable({ 
  subCategories, 
  setIsModalOpen, 
  setSelectedSubCategory,
  currentPage,
  setCurrentPage,
  totalPages,
  totalSubCategories,
  limit
}) {
  const navigate = useNavigate();

  const start = subCategories.length === 0
    ? 0
    : (currentPage - 1) * limit + 1;

  const end = (currentPage - 1) * limit + subCategories.length;

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Table Header */}
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4 sm:px-6">
        <div>
          <h2 className="text-base font-semibold text-[#0B1F3A]">
            All Sub-categories
          </h2>

          <p className="mt-0.5 text-xs text-gray-500">
            {subCategories.length} sub-categories found
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] text-left">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Name
              </th>

              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Slug
              </th>

              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Category
              </th>

              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Status
              </th>

              <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {subCategories.map(({ _id, name, slug, category , isActive }) => (
              <tr
                key={_id}
                className="transition-colors hover:bg-gray-50/70"
              >
                {/* Name */}
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {name}
                    </p>

                    {/* <p className="mt-0.5 text-xs text-gray-400">
                      ID: #{subCategory.id.toString().padStart(4, "0")}
                    </p> */}
                  </div>
                </td>

                {/* Slug */}
                <td className="px-6 py-4">
                  <span className="rounded-md bg-gray-100 px-2 py-1 font-mono text-xs text-gray-600">
                    /{slug}
                  </span>
                </td>

                {/* Category */}
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-gray-700">
                    {category?.name}
                  </span>
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  {isActive === true ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 
                    text-xs font-medium text-green-700">
                      <CheckCircle2 size={13} />
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 
                    py-1 text-xs font-medium text-gray-600">
                      <XCircle size={13} />
                      Inactive
                    </span>
                  )}
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => navigate(`/admin/sub-categories/${_id}/edit`)}
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 
                      transition hover:bg-blue-50 hover:text-[#0B1F3A]"
                      aria-label={`Edit ${name}`}
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedSubCategory({ _id, name })
                        setIsModalOpen(true)
                      }}
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 
                      transition hover:bg-red-50 hover:text-red-600"
                      aria-label={`Delete ${name}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex flex-col gap-3 border-t border-gray-200 px-4 py-4 sm:flex-row sm:items-center 
                      sm:justify-between sm:px-6">
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
            {totalSubCategories}
          </span>{" "}
          sub-categories
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

export default SubCategoriesTable;