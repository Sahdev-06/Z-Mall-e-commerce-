import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductByIdForAdmin, updateProductStock } from "../services/productService";
import AdminPageLoader from "../components/AdminComponent/Layout/AdminPageLoader";
import { Package, CircleCheck, Loader2, TriangleAlert } from "lucide-react";
import { useToast } from "../context/ToastContext";


function EditProductStockPage() {
    const navigate = useNavigate()
    const { showToast } = useToast();

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
        return <AdminPageLoader />
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
            showToast("Stock updated successfully", "success")
        } catch (error) {
            console.log(error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">

            {/* Header */}
            <div className="mb-6 sm:mb-8">
                <div className="flex items-start gap-3 sm:gap-4">
                    <div className="hidden sm:flex h-11 w-11 shrink-0 items-center justify-center rounded-xl 
                                    bg-orange-100 text-orange-600">
                        <Package className="h-5 w-5" />
                    </div>

                <div>

                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                    Update Product Stock
                </h1>

                <p className="mt-1.5 sm:mt-2 text-sm sm:text-base text-slate-600">
                    Update the available stock quantity for this product.
                </p>
            </div>
        </div>
    </div>

    <form onSubmit={handleSubmit}>

        {/* Stock Information */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-100 px-4 py-5 sm:px-6 sm:py-6">
                <h2 className="text-lg font-semibold text-slate-900">
                    Stock Information
                </h2>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                    Enter the new stock quantity. An inventory log will be
                    created automatically.
                </p>
            </div>

            <div className="px-4 py-5 sm:px-6 sm:py-7">
                <div className="grid grid-cols-1 gap-5 sm:gap-6">

                    {/* Product Name */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Product Name
                        </label>

                        <input
                            type="text"
                            value={product.name}
                            readOnly
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm sm:text-base text-slate-600 shadow-sm outline-none cursor-not-allowed"
                        />
                    </div>

                    {/* Current Stock */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Current Stock
                        </label>

                        <div className="relative">
                            <input
                                type="number"
                                value={product.stock}
                                readOnly
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-20 text-sm sm:text-base font-medium text-slate-700 shadow-sm outline-none cursor-not-allowed"
                            />

                            <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg bg-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600">
                                Current
                            </span>
                        </div>
                    </div>

                    {/* New Stock */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            New Stock
                        </label>

                        <input
                            type="number"
                            name="newStock"
                            value={formData.newStock}
                            onChange={handleChange}
                            placeholder="Enter new stock quantity"
                            min="0"
                            className={`w-full rounded-xl border px-4 py-3 text-sm sm:text-base text-slate-900 shadow-sm outline-none transition
                                placeholder:text-slate-400
                                ${
                                    errors.stock
                                        ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                                        : "border-slate-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                                }`}
                        />

                        {errors.stock && (
                            <div className="mt-2 flex items-center gap-1.5 text-sm text-red-600">
                                <CircleCheck className="h-5 w-5" />

                                <span>{errors.stock}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>

        {/* Stock Summary */}
        <div className="mt-5 sm:mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-100 px-4 py-5 sm:px-6 sm:py-6">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">
                            Stock Summary
                        </h2>

                        <p className="mt-1 text-sm leading-6 text-slate-500">
                            Review the stock changes before updating.
                        </p>
                    </div>

                    <div className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                        <TriangleAlert className="h-4 w-4 shrink-0" />
                    </div>
                </div>
            </div>

            <div className="px-4 py-5 sm:px-6 sm:py-7">

                <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">

                    {/* Current Stock */}
                    <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-4 py-4 sm:px-5">
                        <span className="text-sm sm:text-base text-slate-600">
                            Current Stock
                        </span>

                <span className="font-semibold text-slate-900">
                    {product.stock}
                </span>
            </div>

                    {/* New Stock */}
                    <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-4 py-4 sm:px-5">
                        <span className="text-sm sm:text-base text-slate-600">
                            New Stock
                        </span>

                        <span className="font-semibold text-slate-900">
                            {formData.newStock === "" ? "_" : formData.newStock}
                        </span>
                    </div>

                    {/* Stock Change */}
                    <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-5">
                        <span className="text-sm sm:text-base text-slate-600">
                            Stock Change
                        </span>

                        <span
                            className={`rounded-lg px-2.5 py-1 text-sm font-semibold ${
                                formData.newStock === ""
                                    ? "bg-slate-200 text-slate-500"
                                    : formData.newStock > product.stock
                                        ? "bg-green-100 text-green-700"
                                        : formData.newStock < product.stock
                                            ? "bg-red-100 text-red-700"
                                            : "bg-slate-200 text-slate-600"
                            }`}
                        >
                            {formData.newStock === ""
                                ? "_"
                                : formData.newStock > product.stock
                                    ? `+${formData.newStock - product.stock}`
                                    : formData.newStock < product.stock
                                        ? `-${product.stock - formData.newStock}`
                                        : "No Change"}
                        </span>
                    </div>

                </div>
            </div>
        </div>

        {/* Actions */}
        <div className="mt-5 sm:mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

            <button
                type="button"
                onClick={() => {
                    navigate("/admin/products")
                }}
                className="w-full sm:w-auto rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 shadow-sm transition
                    hover:bg-slate-50
                    focus:outline-none focus:ring-4 focus:ring-slate-100
                    active:scale-[0.98]"
            >
                Cancel
            </button>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition
                    hover:bg-orange-600
                    focus:outline-none focus:ring-4 focus:ring-orange-100
                    active:scale-[0.98]
                    disabled:cursor-not-allowed disabled:opacity-60"
            >
                {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />

                        Saving...
                    </span>
                ) : (
                    "Update Stock"
                )}
            </button>

        </div>
    </form>
</div>
    );
}



export default EditProductStockPage