import ProductTableRow from "./ProductTableRow";
import { productTable } from "../../../Dummy/dummyData";

function ProductTable({ products, modal, selectedProduct }) {
    return (
        <div className="mt-6 bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="max-h-[500px] overflow-y-auto">
            <table className="min-w-full">
                <thead className="sticky top-0 bg-slate-50 border-b border-gray-200 z-10">
                    <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider 
                                    text-gray-500">
                            image
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider 
                                    text-gray-500">
                            product
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider 
                                    text-gray-500">
                            price
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider 
                                    text-gray-500">
                            stock
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider 
                                    text-gray-500">
                            status
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider 
                                    text-gray-500">
                            actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map(({ _id, images, name, category, price, stock, isActive }) => (
                            <ProductTableRow
                                key={_id}
                                _id={_id}
                                image={images[0]}
                                name={name}
                                category={category?.name}
                                price={price}
                                stock={stock}
                                status={isActive}
                                modal={modal}
                                selectedProduct={selectedProduct}
                            />
                        ))
                    }
                </tbody>
            </table>
            </div>
        </div>
    )
}


export default ProductTable