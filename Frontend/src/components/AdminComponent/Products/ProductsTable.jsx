import {
  CheckCircle2,
  Pencil,
  PackagePlus,
  Trash2,
  XCircle,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import ToggleSwitch from "../../Common/ToggleSwitch";
import ProductActions from "./ProductActions"

function ProductsTable({ 
  products, 
  setIsModalOpen, 
  setSelectedProduct,
  currentPage,
  setCurrentPage,
  totalPages,
  totalProducts,
  limit
}) {
  const navigate = useNavigate();

  const start = products.length === 0
    ? 0
    : (currentPage - 1) * limit + 1;

  const end = (currentPage - 1) * limit + products.length;

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Table Header */}
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4 sm:px-6">
        <div>
          <h2 className="text-base font-semibold text-[#0B1F3A]">
            All Products
          </h2>

          <p className="mt-0.5 text-xs text-gray-500">
            {products.length} products found
          </p>
        </div>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Product
              </th>

              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Category
              </th>

              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Price
              </th>

              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Stock
              </th>

              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Status
              </th>

              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Featured
              </th>

              <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {products.map(({ _id, images, name, category, price, stock, isActive, isFeatured }) => (
              <tr
                key={_id}
                className="transition-colors hover:bg-gray-50/70"
              >
                {/* Product */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg border 
                                border-gray-200 bg-gray-100">
                      <img
                        src={images[0]}
                        alt={name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="max-w-[220px] truncate text-sm font-semibold text-gray-900">
                        {name}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Category */}
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600">
                    {category?.name}
                  </span>
                </td>

                {/* Price */}
                <td className="px-6 py-4">
                  <span className="text-sm font-semibold text-gray-900">
                    ₹{price.toLocaleString("en-IN")}
                  </span>
                </td>

                {/* Stock */}
                <td className="px-6 py-4">
                  <span
                    className={`text-sm font-medium ${
                      stock === 0
                        ? "text-red-600"
                        : stock <= 5
                          ? "text-orange-600"
                          : "text-gray-700"
                    }`}
                  >
                    {stock}
                  </span>

                  {stock <= 5 && (
                    <p className="mt-0.5 text-[11px] text-orange-500">
                      {stock === 0 ? "Out of stock" : "Low stock"}
                    </p>
                  )}
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  {isActive === true ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 
                                    px-2.5 py-1 text-xs font-medium text-green-700">
                      <CheckCircle2 size={13} />
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 
                                px-2.5 py-1 text-xs font-medium text-gray-600">
                      <XCircle size={13} />
                      Inactive
                    </span>
                  )}
                </td>

                {/* Featured */}
                <td className="px-6 py-4">
                  <ToggleSwitch _id={_id} checked={isFeatured}/>
                </td>


                {/* Actions */}
                <td className="px-6 py-4">
                  {/* <div className="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => navigate(`/admin/products/${_id}/edit`)}
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 
                                    transition hover:bg-blue-50 hover:text-[#0B1F3A]"
                      aria-label={`Edit ${name}`}
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={() => navigate(`/admin/products/${_id}/stock`)}
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 
                                    transition hover:bg-gray-100 hover:text-gray-800"
                      aria-label={`More actions for ${name}`}
                    >
                      <PackagePlus size={17} />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsModalOpen(true)
                        setSelectedProduct({ _id, name })
                      }}
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 
                                    transition hover:bg-red-50 hover:text-red-600"
                      aria-label={`Delete ${name}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div> */}
                  <ProductActions 
                    _id={_id}
                    setIsModalOpen={setIsModalOpen}
                    setSelectedProduct={setSelectedProduct}
                    name={name}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex flex-col gap-3 border-t border-gray-200 px-4 py-4 sm:flex-row 
                        sm:items-center sm:justify-between sm:px-6">
        <p className="text-xs text-gray-500">
          Showing 
          <span className="font-medium text-gray-700">
            {start}
          </span> to{" "}
          <span className="font-medium text-gray-700">
            {end}
          </span>{" "}
          of 
          <span className="font-medium text-gray-700">
            {totalProducts}
          </span>{" "}
          products
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
            {currentPage}
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

export default ProductsTable;


