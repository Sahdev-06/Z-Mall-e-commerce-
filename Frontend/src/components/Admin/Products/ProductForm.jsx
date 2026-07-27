import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import validateProduct from "../../../utils/productValidation.js";
import { getAllCategories } from "../../../services/categoryService.js"
import { getAllSubCategories } from "../../../services/subCategoryService.js";
import { createProduct, updateProduct } from "../../../services/productService.js";

function ProductForm({ initialData = null, mode = "add", id }) {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: initialData?.name || "",
        price: initialData?.price || "",
        description: initialData?.description || "",
        discount: initialData?.discount || "",
        stock: initialData?.stock || "",
        category: initialData?.category?._id || "",
        subCategory: initialData?.subCategory?._id || "",
        isActive: initialData?.isActive ?? true,
    });

    const [previewImages, setPreviewImages] = useState([]);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);


    // Run useEffect
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const result = await getAllCategories()
                setCategories(result.data)
            } catch (error) {
                console.log("category err:", error)
            }
        }

        fetchCategories();

        const fetchSubCategories = async () => {
            try {
                const result = await getAllSubCategories()
                setSubCategories(result.data)
            } catch (error) {
                console.log("sub-category err:", error)
            }
        }

        fetchSubCategories();

        if (!initialData) return;

        setFormData({
            name: initialData.name || "",
            price: initialData.price ?? "",
            description: initialData.description || "",
            discount: initialData.discount ?? "",
            stock: initialData.stock ?? "",
            category: initialData.category?._id || "",
            subCategory: initialData.subCategory?._id || "",
            isActive: initialData.isActive ?? true
        })

        setPreviewImages(
            initialData.images.map((url) => ({
                file : null,
                preview : url
            }))
        )
    }, [initialData])

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));

    };

    const handleImageChange = (e) => {

        const files = Array.from(e.target.files);

        if (!files.length) return;

        const previews = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));

        setPreviewImages((prev) => [...prev, ...previews]);

        setErrors((prev) => ({
            ...prev,
            images: "",
        }));

    };

    const removeImage = (index) => {
        const image = previewImages[index]
        
        if(image.file) {
            URL.revokeObjectURL(image.preview);
        }

        setPreviewImages((prev) =>
            prev.filter((_, i) => i !== index)
        );
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const validationErrors = validateProduct(formData, previewImages, mode)

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsSubmitting(true)

        try {
            const productData = new FormData()

            productData.append("name", formData.name)
            productData.append("price", formData.price)
            productData.append("description", formData.description)
            productData.append("discount", formData.discount)
            productData.append("stock", formData.stock)
            productData.append("category", formData.category)
            productData.append("subCategory", formData.subCategory)
            previewImages.forEach((image) => {
                if(image.file) {
                    productData.append("images", image.file)
                }
            })

            if (mode === "edit") {
                await updateProduct(id, productData)
                navigate("/admin/products");
            } else {
                await createProduct(productData)
                navigate("/admin/products");
            }

        } catch (error) {
            console.log(error)
        } finally {
            setIsSubmitting(false)
        }

    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-8"
        >

            {/* Product Information */}

            <div className="bg-white rounded-2xl shadow-sm p-6">

                <h2 className="text-lg font-semibold text-slate-900">
                    Product Information
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Fill in the details below to create a product.
                </p>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Product Name */}

                    <div>

                        <label className="block mb-2 text-sm font-medium text-slate-700">
                            Product Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter product name"
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none
                        focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                        />

                        {errors.name && (
                            <p className="mt-2 text-sm text-red-500">
                                {errors.name}
                            </p>
                        )}

                    </div>

                    {/* Category */}
                    {mode === "add" && (
                        <div>

                            <label className="block mb-2 text-sm font-medium text-slate-700">
                                Category
                            </label>

                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none
                        focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                            >

                                <option value="">
                                    Select Category
                                </option>

                                {categories.map((category) => (
                                    <option
                                        key={category._id}
                                        value={category._id}
                                    >
                                        {category.name}
                                    </option>
                                ))}

                            </select>

                            {errors.category && (
                                <p className="mt-2 text-sm text-red-500">
                                    {errors.category}
                                </p>
                            )}

                        </div>
                    )}

                    {/* Sub Category */}
                    {mode === "add" && (
                        <div>

                            <label className="block mb-2 text-sm font-medium text-slate-700">
                                Sub Category
                            </label>

                            <select
                                name="subCategory"
                                value={formData.subCategory}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none
                        focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                            >

                                <option value="">
                                    Select Sub Category
                                </option>

                                {subCategories.map((subCategory) => (
                                    <option
                                        key={subCategory._id}
                                        value={subCategory._id}
                                    >
                                        {subCategory.name}
                                    </option>
                                ))}

                            </select>

                            {errors.subCategory && (
                                <p className="mt-2 text-sm text-red-500">
                                    {errors.subCategory}
                                </p>
                            )}

                        </div>
                    )}

                    {/* pricing in edit mode */}
                    {mode === "edit" && (
                        <div>

                            <label className="block mb-2 text-sm font-medium text-slate-700">
                                Price
                            </label>

                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="0"
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none
                        focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                            />

                            {errors.price && (
                                <p className="mt-2 text-sm text-red-500">
                                    {errors.price}
                                </p>
                            )}

                        </div>
                    )}

                </div>

                {/* Description */}

                <div className="mt-6">

                    <label className="block mb-2 text-sm font-medium text-slate-700">
                        Description
                    </label>

                    <textarea
                        rows={5}
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter product description..."
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 resize-none outline-none
                    focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                    />

                    {errors.description && (
                        <p className="mt-2 text-sm text-red-500">
                            {errors.description}
                        </p>
                    )}

                </div>

            </div>

            {/* Pricing */}
            {mode === "add" && (
                <div className="bg-white rounded-2xl shadow-sm p-6">

                    <h2 className="text-lg font-semibold text-slate-900">
                        Pricing & Inventory
                    </h2>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">

                        <div>

                            <label className="block mb-2 text-sm font-medium text-slate-700">
                                Price
                            </label>

                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="0"
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none
                        focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                            />

                            {errors.price && (
                                <p className="mt-2 text-sm text-red-500">
                                    {errors.price}
                                </p>
                            )}

                        </div>

                        <div>

                            <label className="block mb-2 text-sm font-medium text-slate-700">
                                Discount (%)
                            </label>

                            <input
                                type="number"
                                name="discount"
                                value={formData.discount}
                                onChange={handleChange}
                                placeholder="0"
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none
                        focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                            />

                        </div>

                        <div>

                            <label className="block mb-2 text-sm font-medium text-slate-700">
                                Stock
                            </label>

                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                placeholder="0"
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none
                        focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                            />

                        </div>

                    </div>

                </div>
            )}

            {/* Product Images */}
            <div className="bg-white rounded-2xl shadow-sm p-6">

                <h2 className="text-lg font-semibold text-slate-900">
                    Product Images
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Upload one or more product images.
                </p>

                <div className="mt-6">

                    <label
                        className="flex flex-col items-center justify-center h-72 border-2 border-dashed
                    border-gray-300 rounded-2xl cursor-pointer hover:border-orange-500
                    transition"
                    >

                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            hidden
                            onChange={handleImageChange}
                        />

                        <span className="text-5xl">
                            📷
                        </span>

                        <p className="mt-4 text-slate-700 font-medium">
                            Click to upload images
                        </p>

                        <p className="text-sm text-slate-500 mt-1">
                            PNG, JPG, JPEG, WEBP
                        </p>

                    </label>

                    {errors.images && (
                        <p className="mt-3 text-sm text-red-500">
                            {errors.images}
                        </p>
                    )}

                </div>

                {/* Image Preview */}

                {
                    previewImages.length > 0 && (

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">

                            {
                                previewImages.map((image, index) => (

                                    <div
                                        key={index}
                                        className="relative"
                                    >

                                        <img
                                            src={image.preview}
                                            alt={`Preview ${index + 1}`}
                                            className="h-40 w-full object-cover rounded-xl border"
                                        />

                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute top-2 right-2 bg-red-500 text-white
                                        w-7 h-7 rounded-full hover:bg-red-600"
                                        >
                                            ×
                                        </button>

                                    </div>

                                ))
                            }

                        </div>

                    )
                }

            </div>

            {/* Status */}

            <div className="bg-white rounded-2xl shadow-sm p-6">

                <h2 className="text-lg font-semibold text-slate-900">
                    Status
                </h2>

                <div className="mt-5 flex items-center gap-3">

                    <input
                        type="checkbox"
                        id="isActive"
                        name="isActive"
                        checked={formData.isActive}
                        onChange={handleChange}
                        className="h-5 w-5 accent-orange-500"
                    />

                    <label
                        htmlFor="isActive"
                        className="text-slate-700 font-medium"
                    >
                        Active
                    </label>

                </div>

            </div>

            {/* Buttons */}

            <div className="flex justify-end gap-4">

                <button
                    type="button"
                    onClick={() => navigate("/admin/products")}
                    className="px-6 py-3 rounded-xl border border-gray-300
                hover:bg-gray-100 transition"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 rounded-xl bg-orange-500
                hover:bg-orange-600 disabled:bg-orange-300
                text-white font-medium transition"
                >
                    {
                        isSubmitting
                            ? "Saving..."
                            : mode === "edit"
                                ? "Update Product"
                                : "Save Product"
                    }
                </button>

            </div>

        </form>
    );
}


export default ProductForm