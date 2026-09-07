import SubCategoryFormHeader from "../components/AdminComponent/SubCategories/SubCategoryForm/SubCategoryFormHeader";
import SubCategoryBasicInfo from "../components/AdminComponent/SubCategories/SubCategoryForm/SubCategoryBasicInfo";
import SubCategoryCategory from "../components/AdminComponent/SubCategories/SubCategoryForm/SubCategoryCategory";
import SubCategoryStatus from "../components/AdminComponent/SubCategories/SubCategoryForm/SubCategoryStatus";
import SubCategoryFormActions from "../components/AdminComponent/SubCategories/SubCategoryForm/SubCategoryFormActions";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import { getSubCategoryById, updateSubCategory } from "../services/subCategoryService";
import { getAllCategories } from "../services/categoryService";
import validateSubCategory from "../utils/subCategoryValidation";
import AdminPageLoader from "../components/AdminComponent/Layout/AdminPageLoader";


function EditSubCategoryPage() {
    const { id } = useParams()
    const navigate = useNavigate();
    const { showToast } = useToast();

    const [formData, setFormData] = useState({
        name : "",
        slug : "",
        category : "",
        isActive : ""
    })

    const [loading, setLoading] = useState(true)
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [categories, setCategories] = useState([])

    // fetching sub-category
    useEffect(() => {
        const fetchSubCategory = async () => {
            try {
                const subCategory = await getSubCategoryById(id)
                setFormData({
                    name : subCategory.data.name,
                    slug : subCategory.data.slug,
                    category : subCategory.data.category._id,
                    isActive : subCategory.data.isActive
                })

            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        fetchSubCategory()
    }, [id])

    // fetching categories
    useEffect(() => {
        const fetchAllCategories = async () => {
            try {
                const result = await getAllCategories()
                setCategories(result.data.categories)
            } catch (error) {
                console.log(error)
            }
        }

        fetchAllCategories()
    }, [id])


    // handle input change
    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData(prev => ({
            ...prev,
            [name] : value
        }))

        setErrors(prev => ({
            ...prev,
            [name] : ""
        }))
    }

    // handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateSubCategory(formData)

        if(Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        setIsSubmitting(true)

        const subCategoryData = {
            name : formData.name,
            slug : formData.slug,
            category : formData.category,
        }

        try {
            await updateSubCategory(id, subCategoryData)
            navigate("/admin/sub-categories")
            showToast("Sub-category edited successfully", "success")
        } catch (error) {
            console.lor(error)
        } finally {
            setIsSubmitting(false)
        }

        
    }


    if(loading) {
        return <AdminPageLoader />
    }


    return (
        <div className="mx-auto w-full max-w-5xl">
            <SubCategoryFormHeader 
                mode={"edit"}
            />

            <form 
                className="space-y-5"
                onSubmit={handleSubmit}
            >
                <SubCategoryBasicInfo 
                    name={formData.name}
                    slug={formData.slug}
                    onChange={handleChange}
                    errors={errors}
                />

                <SubCategoryCategory 
                    categories={categories}
                    category={formData.category}
                    onChange={handleChange}
                    errors={errors}
                />

                <SubCategoryStatus />

                <SubCategoryFormActions 
                    isSubmitting={isSubmitting}
                    mode={"edit"}
                />
            </form>
        </div>
    )
}


export default EditSubCategoryPage