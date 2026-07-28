import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductByIdForAdmin, updateProductStock } from "../../services/productService";
import PageHeader from "../../components/Admin/Common/PageHeader"
import AdminLayout from "../../components/Admin/AdminLayout"
import Loading from "../../components/Common/Loading"
import ErrorState from "../../components/Common/ErrorState"

function EditProductStock() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        newStock: ""
    })
    const [product, setProduct] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [errors, setErrors] = useState({
        stock: ""
    })

    const { id } = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const result = await getProductByIdForAdmin(id)
                setProduct(result.data)
            } catch (error) {
                setError("Failed to load stock details")
            } finally {
                setLoading(false)
            }
        }

        fetchProduct();
    }, [id])

    if (loading) {
        return <Loading />
    }

    if (error) {
        return <ErrorState message={error} />
    }

    // handle stock change
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    // validate form
    const validateForm = () => {

        const newErrors = {
            stock: "",
        };

        if (formData.newStock === "") {
            newErrors.stock = "Please enter the new stock quantity.";
        }
        else if (!Number.isInteger(Number(formData.newStock))) {
            newErrors.stock = "Stock quantity must be a whole number.";
        }
        else if (Number(formData.newStock) < 0) {
            newErrors.stock = "Stock quantity cannot be negative.";
        }
        else if (Number(formData.newStock) === product.stock) {
            newErrors.stock = "No changes were made to the stock.";
        }

        setErrors(newErrors);

        return Object.values(newErrors).every((error) => error === "");
    };

    // handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return

        setIsSubmitting(true)

        try {
            const stockData = {
                newStock: formData.newStock
            }

            await updateProductStock(id, stockData)
            navigate("/admin/products")
        } catch (error) {
            console.log(error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <AdminLayout title={"Update Product Stock"}>
            <div className="max-w-4xl mx-auto">

                {/* Header */}

                <div>
                    <h1 className="text-3xl font-bold text-slate-900">
                        Update Product Stock
                    </h1>

                    <p className="mt-2 text-slate-600">
                        Update the available stock quantity for this product.
                    </p>
                </div>

                {/* Card */}
                <form
                    onSubmit={handleSubmit}
                >
                    <div className="mt-8 bg-white rounded-2xl shadow-sm p-6">

                        <h2 className="text-lg font-semibold text-slate-900">
                            Stock Information
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Enter the new stock quantity. An inventory log will be created automatically.
                        </p>

                        {/* Form */}

                        <div className="mt-8 space-y-6">

                            {/* Product Name */}

                            <div>

                                <label className="block mb-2 text-sm font-medium text-slate-700">
                                    Product Name
                                </label>

                                <input
                                    type="text"
                                    value={product.name}
                                    readOnly
                                    className="w-full rounded-xl border border-gray-300 bg-slate-100 px-4 py-3 text-slate-600 cursor-not-allowed"
                                />

                            </div>

                            {/* Current Stock */}

                            <div>

                                <label className="block mb-2 text-sm font-medium text-slate-700">
                                    Current Stock
                                </label>

                                <input
                                    type="number"
                                    value={product.stock}
                                    readOnly
                                    className="w-full rounded-xl border border-gray-300 bg-slate-100 px-4 py-3 text-slate-600 cursor-not-allowed"
                                />

                            </div>

                            {/* New Stock */}

                            <div>

                                <label className="block mb-2 text-sm font-medium text-slate-700">
                                    New Stock
                                </label>

                                <input
                                    type="number"
                                    name="newStock"
                                    value={formData.newStock}
                                    onChange={handleChange}
                                    placeholder="Enter new stock quantity"
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none
                                    focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                                />

                                {errors.stock && (
                                    <p className="mt-2 text-sm text-red-500">
                                        {errors.stock}
                                    </p>
                                )}

                            </div>

                        </div>

                    </div>

                    {/* Stock Summary */}

                    <div className="mt-8 bg-white rounded-2xl shadow-sm p-6">

                        <h2 className="text-lg font-semibold text-slate-900">
                            Stock Summary
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Review the stock changes before updating.
                        </p>

                        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5">

                            <div className="flex justify-between items-center py-2 border-b border-slate-200">

                                <span className="text-slate-600">
                                    Current Stock
                                </span>

                                <span className="font-semibold text-slate-900">
                                    {product.stock}
                                </span>

                            </div>

                            <div className="flex justify-between items-center py-2 border-b border-slate-200">

                                <span className="text-slate-600">
                                    New Stock
                                </span>

                                <span className="font-semibold text-slate-900">
                                    {formData.newStock}
                                </span>

                            </div>

                            <div className="flex justify-between items-center pt-3">

                                <span className="text-slate-600">
                                    Stock Change
                                </span>

                                {/* Increase */}

                                <span
                                    className={`font-semibold ${formData.newStock === ""
                                        ? "text-slate-500"
                                        : formData.newStock > product.stock
                                            ? "text-green-600"
                                            : formData.newStock < product.stock
                                                ? "text-red-600"
                                                : "text-slate-500"
                                        }`}
                                >
                                    {
                                        formData.newStock === ""
                                            ? "_"
                                            : formData.newStock > product.stock
                                                ? `+${formData.newStock - product.stock}`
                                                : formData.newStock < product.stock
                                                    ? `-${product.stock - formData.newStock}`
                                                    : "No Change"
                                    }
                                </span>

                            </div>

                        </div>

                    </div>

                    {/* Buttons */}

                    <div className="mt-8 flex justify-end gap-4">

                        <button
                            className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
                            type="button"
                            onClick={() => {
                                navigate("/admin/products")
                            }}
                        >
                            Cancel
                        </button>

                        <button
                            className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600
                                    text-white font-medium transition"
                            type="submit"
                        >
                            {
                                isSubmitting
                                    ? "Saving..."
                                    : "Update Stock"
                            }
                        </button>

                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}



export default EditProductStock