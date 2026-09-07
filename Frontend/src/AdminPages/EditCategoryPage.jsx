import CategoryFormHeader from "../components/AdminComponent/Categories/CategoryForm/CategoryFormHeader";
import CategoryImageUpload from "../components/AdminComponent/Categories/CategoryForm/CategoryImageUpload";
import CategoryBasicInfo from "../components/AdminComponent/Categories/CategoryForm/CategoryBasicInfo";
import CategoryStatus from "../components/AdminComponent/Categories/CategoryForm/CategoryStatus";
import CategoryFormActions from "../components/AdminComponent/Categories/CategoryForm/CategoryFormActions";
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getCategoryById, updateCategory } from "../services/categoryService";
import { useToast } from "../context/ToastContext"
import AdminPageLoader from "../components/AdminComponent/Layout/AdminPageLoader";
import validateCategory from "../utils/categoryValidation";


function EditCategoryPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { showToast } = useToast();

    const [formData, setFormData] = useState({
        name : "",
        slug : "",
        description : "",
        isActive : "", 
        image : null
    })

    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    
    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const category = await getCategoryById(id)
                setFormData({
                    name : category.data.name,
                    slug : category.data.slug,
                    description : category.data.description,
                    isActive : category.data.isActive,
                    image : category.data.image
                })

            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        fetchCategory()
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

    // handle image change
    const handleImageChange = (e) => {
        const file = e.target.files[0]

        if(!file) return

        setFormData(prev => ({
        ...prev,
        image : file
        }))

        setErrors(prev => ({
        ...prev,
        image : ""
        }))
    }

    // handle remove image
    const handleRemoveImage = (e) => {
        setFormData(prev => ({
        ...prev,
        image : null
        }))
    }

    // handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateCategory(formData)

        if(Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        setIsSubmitting(true)

        const categoryData = new FormData()

        categoryData.append("name", formData.name)
        categoryData.append("slug", formData.slug)
        categoryData.append("description", formData.description)

        if(formData.image instanceof File) {
            categoryData.append("image", formData.image)
        }

        try {
            const result = await updateCategory(id, categoryData)
            navigate("/admin/categories")
            showToast("Category updated successfully", "success")
        } catch (error) {
            console.log(error)
        } finally {
            setIsSubmitting(false)
        }
        
    }


    if(loading) {
        return <AdminPageLoader />
    }

    return (
        <div className="mx-auto w-full max-w-5xl">
            <CategoryFormHeader 
                mode={"edit"}
            />

            <form 
                className="space-y-5"
                onSubmit={handleSubmit}
            >
                <CategoryImageUpload 
                    image={formData.image}
                    onChange={handleImageChange}
                    onRemove={handleRemoveImage}
                    errors={errors}
                />

                <CategoryBasicInfo 
                    name={formData.name}
                    slug={formData.slug}
                    descriptin={formData.description}
                    onChange={handleChange}
                    errors={errors}
                />

                <CategoryStatus 
                    status={formData.isActive}
                    onChange={handleChange}
                />

                <CategoryFormActions 
                    isSubmitting={isSubmitting}
                    mode={"edit"}
                />
            </form>
        </div>
    )
}


export default EditCategoryPage