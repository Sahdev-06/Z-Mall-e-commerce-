import CategoryFormHeader from "../components/AdminComponent/Categories/CategoryForm/CategoryFormHeader";
import CategoryImageUpload from "../components/AdminComponent/Categories/CategoryForm/CategoryImageUpload";
import CategoryBasicInfo from "../components/AdminComponent/Categories/CategoryForm/CategoryBasicInfo";
import CategoryStatus from "../components/AdminComponent/Categories/CategoryForm/CategoryStatus";
import CategoryFormActions from "../components/AdminComponent/Categories/CategoryForm/CategoryFormActions";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCategory } from "../services/categoryService";
import { useToast } from "../context/ToastContext"
import validateCategory from "../utils/categoryValidation";


function AddCategoryPage() {
  const [formData, setFormData] = useState({
    name : "",
    slug : "",
    description : "",
    isActive : "true",
    image : null
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { showToast } = useToast();
  const navigate = useNavigate();

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

  // handle form submit
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
    categoryData.append("image", formData.image)

    // API call
    try {
      const result = await createCategory(categoryData)
      navigate("/admin/categories")
      showToast("Category created successfully", "success")
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }

  }

  return (
    <div className="mx-auto w-full max-w-5xl">
      <CategoryFormHeader />

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
        />
      </form>
    </div>
  );
}

export default AddCategoryPage;