import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import generateSlug from "../../../utils/generateSlug";
import validateCategory from "../../../utils/categoryValidation";
import { createCategory, updateCategory } from "../../../services/categoryService";

function CategoryForm({ initialData = null, mode = "add", id }) {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: initialData?.name || "",
        slug: initialData?.slug || "",
        description: initialData?.description || "",
        image: null,
        isActive: initialData?.isActive ?? true,
    });

    const [previewImage, setPreviewImage] = useState(
        initialData?.image || null
    );

    const [errors, setErrors] = useState({});

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [isSlugEdited, setIsSlugEdited] = useState(
        !!initialData?.slug
    );

    // =========================
    // Effect run
    // =========================

    useEffect(() => {
        if (!initialData) return;

        setFormData({
            name: initialData.name || "",
            slug: initialData.slug || "",
            description: initialData.description || "",
            image: null,
            isActive: initialData.isActive ?? true,
        });

        setPreviewImage(initialData.image || null);

        setIsSlugEdited(!!initialData.slug);

    }, [initialData]);

    // ==========================
    // Handle Text Inputs
    // ==========================

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        if (name === "slug") {

            setIsSlugEdited(value.trim() !== "");

            setFormData((prev) => ({
                ...prev,
                slug: generateSlug(value)
            }));

        }

        else {

            setFormData((prev) => {

                const updatedData = {
                    ...prev,
                    [name]: type === "checkbox"
                        ? checked
                        : value,
                };

                if (name === "name") {

                    if (value.trim() === "") {

                        updatedData.slug = "";

                        setIsSlugEdited(false);

                    }

                    else if (!isSlugEdited) {

                        updatedData.slug = generateSlug(value);

                    }

                }

                return updatedData;

            });

        }

        // Clear Error

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));

    };

    // ==========================
    // Handle Image
    // ==========================

    const handleImageChange = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        setFormData((prev) => ({
            ...prev,
            image: file,
        }));

        setPreviewImage(URL.createObjectURL(file));

        setErrors((prev) => ({
            ...prev,
            image: "",
        }));

    };

    // ==========================
    // Remove Image
    // ==========================

    const removeImage = () => {

        setFormData((prev) => ({
            ...prev,
            image: null,
        }));

        setPreviewImage(null);

    };

    // ==========================
    // Submit
    // ==========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        const validationErrors = validateCategory(formData, mode);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsSubmitting(true);

        try {
            /*
                API Call Here
            */
            const categoryData = new FormData()

            categoryData.append("name", formData.name)
            categoryData.append("slug", formData.slug)
            categoryData.append("description", formData.description)
            categoryData.append("image", formData.image)

            if(mode === "edit") {
                await updateCategory(id, categoryData)
                navigate("/admin/categories");
            } else {
                await createCategory(categoryData)
                navigate("/admin/categories");
            }

        } catch (error) {

            console.log(error);

        } finally {

            setIsSubmitting(false);

        }

    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-8"
        >
            {/* Category Information */}
            <div className="bg-white rounded-2xl shadow-sm p-6">

                <h2 className="text-lg font-semibold text-slate-900">
                    Category Information
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Fill in the details below to create a category.
                </p>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Category Name */}

                    <div>
                        <label className="block mb-2 text-sm font-medium text-slate-700">
                            Category Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter category name"
                            autoFocus
                            className={`w-full rounded-xl border px-4 py-3 outline-none transition
                        ${errors.name
                                    ? "border-red-500"
                                    : "border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                                }`}
                        />

                        {errors.name && (
                            <p className="mt-2 text-sm text-red-500">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    {/* Slug */}

                    <div>
                        <label className="block mb-2 text-sm font-medium text-slate-700">
                            Slug
                        </label>

                        <input
                            type="text"
                            name="slug"
                            value={formData.slug}
                            onChange={handleChange}
                            placeholder="category-slug"
                            className={`w-full rounded-xl border px-4 py-3 outline-none transition
                        ${errors.slug
                                    ? "border-red-500"
                                    : "border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                                }`}
                        />

                        {errors.slug && (
                            <p className="mt-2 text-sm text-red-500">
                                {errors.slug}
                            </p>
                        )}
                    </div>

                </div>

                {/* Description */}

                <div className="mt-6">

                    <div className="flex justify-between items-center mb-2">

                        <label className="text-sm font-medium text-slate-700">
                            Description
                        </label>

                        <span className="text-xs text-slate-400">
                            {formData.description.length}/500
                        </span>

                    </div>

                    <textarea
                        rows={5}
                        maxLength={500}
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Write category description..."
                        className={`w-full rounded-xl border px-4 py-3 resize-none outline-none transition
                    ${errors.description
                                ? "border-red-500"
                                : "border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                            }`}
                    />

                    {errors.description && (
                        <p className="mt-2 text-sm text-red-500">
                            {errors.description}
                        </p>
                    )}

                </div>

            </div>

            {/* Category Image */}

            <div className="bg-white rounded-2xl shadow-sm p-6">

                <h2 className="text-lg font-semibold text-slate-900">
                    Category Image
                </h2>

                <div className="mt-6">

                    {!previewImage ? (

                        <label
                            className="flex flex-col items-center justify-center h-72 border-2 border-dashed
                        border-gray-300 rounded-2xl cursor-pointer hover:border-orange-500
                        transition"
                        >

                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleImageChange}
                            />

                            <span className="text-5xl">
                                📷
                            </span>

                            <p className="mt-4 text-slate-700 font-medium">
                                Click to upload image
                            </p>

                            <p className="text-sm text-slate-500 mt-1">
                                PNG, JPG, JPEG, WEBP
                            </p>

                        </label>

                    ) : (

                        <div>

                            <img
                                src={previewImage}
                                alt="Preview"
                                className="h-72 w-full object-cover rounded-2xl border border-gray-200"
                            />

                            <button
                                type="button"
                                onClick={removeImage}
                                className="mt-4 text-red-600 font-medium hover:text-red-700"
                            >
                                Remove Image
                            </button>

                        </div>

                    )}

                    {errors.image && (
                        <p className="mt-3 text-sm text-red-500">
                            {errors.image}
                        </p>
                    )}

                </div>

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
                    onClick={() => navigate("/admin/categories")}
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
                    {isSubmitting
                        ? "Saving..."
                        : mode === "edit"
                            ? "Update Category"
                            : "Save Category"}
                </button>

            </div>

        </form>
    );

}

export default CategoryForm;