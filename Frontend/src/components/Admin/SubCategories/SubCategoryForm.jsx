import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import generateSlug from "../../../utils/generateSlug";
import validateSubCategory from "../../../utils/subCategoryValidation";
import { createSubCategory, updateSubCategory } from "../../../services/subCategoryService";
import { getAllCategories } from "../../../services/categoryService";

function SubCategoryForm({ initialData = null, mode = "add", id}) {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: initialData?.name || "",
        slug: initialData?.slug || "",
        category: initialData?.category?._id || "",
        isActive: initialData?.isActive ?? true,
    });


    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSlugEdited, setIsSlugEdited] = useState(!!initialData?.slug);
    const [categories, setCategories] = useState([])


    // =========================
    // Effect run
    // =========================
    
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const result = await getAllCategories()
                setCategories(result.data)
            } catch (err) {
                console.log("category error : ", err)
            }
        }

        fetchCategories()

        if (!initialData) return;

        setFormData({
            name: initialData.name || "",
            slug: initialData.slug || "", 
            category : initialData.category?._id,
            isActive: initialData.isActive ?? true,
        });

        setIsSlugEdited(!!initialData.slug);

    }, [initialData]);

    // ======================
    // Handle Change
    // ======================

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        if (name === "slug") {

            setIsSlugEdited(value.trim() !== "");

            setFormData((prev) => ({
                ...prev,
                slug: generateSlug(value),
            }));

        } else {

            setFormData((prev) => {

                const updatedData = {
                    ...prev,
                    [name]: type === "checkbox" ? checked : value,
                };

                if (name === "name") {

                    if (value.trim() === "") {

                        updatedData.slug = "";
                        setIsSlugEdited(false);

                    } else if (!isSlugEdited) {

                        updatedData.slug = generateSlug(value);

                    }

                }

                return updatedData;

            });

        }

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));

    };

    // ======================
    // Submit
    // ======================

    const handleSubmit = async (e) => {

        e.preventDefault();

        const validationErrors = validateSubCategory(formData, mode)

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsSubmitting(true)

        try {
            // API call here
            const subCategoryData = {
                name : formData.name,
                slug : formData.slug,
                category : formData.category
            }

            if(mode === "edit") {
                await updateSubCategory(id, subCategoryData)
                navigate("/admin/sub-categories")
            } else {
                await createSubCategory(subCategoryData)
                navigate("/admin/sub-categories")
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

            {/* Information */}

            <div className="bg-white rounded-2xl shadow-sm p-6">

                <h2 className="text-lg font-semibold text-slate-900">
                    Sub Category Information
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Fill in the details below to create a sub category.
                </p>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Name */}

                    <div>

                        <label className="block mb-2 text-sm font-medium text-slate-700">
                            Sub Category Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            autoFocus
                            placeholder="Enter sub category name"
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none
                            focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
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
                            placeholder="sub-category-slug"
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none
                            focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                        />

                        {errors.slug && (
                            <p className="mt-2 text-sm text-red-500">
                                {errors.slug}
                            </p>
                        )}

                    </div>

                </div>

                {/* Parent Category */}

                <div className="mt-6">

                    <label className="block mb-2 text-sm font-medium text-slate-700">
                        Parent Category
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
                    onClick={() => navigate("/admin/sub-categories")}
                    className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 rounded-xl bg-orange-500 text-white
                    hover:bg-orange-600 disabled:bg-orange-300 transition"
                >
                    {
                        isSubmitting
                            ? "Saving..."
                            : mode === "edit"
                                ? "Update Sub Category"
                                : "Save Sub Category"
                    }
                </button>

            </div>

        </form>

    );

}

export default SubCategoryForm;