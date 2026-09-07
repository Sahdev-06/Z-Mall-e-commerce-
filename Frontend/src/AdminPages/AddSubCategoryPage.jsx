import SubCategoryFormHeader from "../components/AdminComponent/SubCategories/SubCategoryForm/SubCategoryFormHeader";
import SubCategoryBasicInfo from "../components/AdminComponent/SubCategories/SubCategoryForm/SubCategoryBasicInfo";
import SubCategoryCategory from "../components/AdminComponent/SubCategories/SubCategoryForm/SubCategoryCategory";
import SubCategoryStatus from "../components/AdminComponent/SubCategories/SubCategoryForm/SubCategoryStatus";
import SubCategoryFormActions from "../components/AdminComponent/SubCategories/SubCategoryForm/SubCategoryFormActions";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createSubCategory } from "../services/subCategoryService";
import { getAllCategories } from "../services/categoryService";
import { useToast } from "../context/ToastContext";
import validateSubCategory from "../utils/subCategoryValidation";
import AdminPageLoader from "../components/AdminComponent/Layout/AdminPageLoader";

function AddSubCategoryPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name : "",
    slug : "",
    category : "",
    isActive : true
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAllCategory = async () => {
      try {
        const result = await getAllCategories()
        setCategories(result.data.categories)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchAllCategory()
  }, [])

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
      category : formData.category
    }

    try {
      const result = await createSubCategory(subCategoryData)
      navigate("/admin/sub-categories")
      showToast("Sub-category added successfully", "success")
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
      <SubCategoryFormHeader />

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
        />
      </form>
    </div>
  );
}

export default AddSubCategoryPage;