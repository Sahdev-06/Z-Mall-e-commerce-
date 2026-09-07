import ProductFormHeader from "../components/AdminComponent/Products/ProductForm/ProductFormHeader";
import ProductImageUpload from "../components/AdminComponent/Products/ProductForm/ProductImageUpload";
import ProductBasicInfo from "../components/AdminComponent/Products/ProductForm/ProductBasicInfo";
import ProductCategory from "../components/AdminComponent/Products/ProductForm/ProductCategory";
import ProductPricing from "../components/AdminComponent/Products/ProductForm/ProductPricing";
import ProductInventory from "../components/AdminComponent/Products/ProductForm/ProductInventory";
import ProductFormActions from "../components/AdminComponent/Products/ProductForm/ProductFormActions";
import ProductSearchKeywords from "../components/AdminComponent/Products/ProductForm/ProductSearchKeywords";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import { createProduct } from "../services/productService";
import { getAllCategories } from "../services/categoryService";
import { getAllSubCategories } from "../services/subCategoryService";
import { validateProduct } from "../utils/productValidation"
import AdminPageLoader from "../components/AdminComponent/Layout/AdminPageLoader";

function AddProductPage() {
  const [formData, setFormData] = useState({
    name : "",
    price : "",
    description : "",
    discount : "",
    stock : "",
    category : "",
    subCategory : "",
    isActive : true,
    images : [],
    keywords : []
  })

  const navigate = useNavigate();
  const { showToast } = useToast();

  const [categories, setCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchdata = async () => {
      try {

        const category = await getAllCategories()
        const subCategory = await getAllSubCategories()
        setCategories(category.data.categories)
        setSubCategories(subCategory.data.subCategories)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchdata()
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

  // handle Image change
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    
    if(files.length === 0) return

    setFormData(prev => ({
      ...prev,
      images : [...prev.images, ...files]
    }))

    setErrors(prev => ({
      ...prev,
      images : ""
    }))

    
  }

  // handle remove image
  const handleRemoveImage = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  };

  // handle keyword change
  const handleKeywordsChange = (keywords) => {
    setFormData((prev) => ({
      ...prev,
      keywords,
    }));
  };



  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationErrors = validateProduct(formData)

    if(Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)

    const productData = new FormData()

    productData.append("name", formData.name)
    productData.append("price", formData.price)
    productData.append("description", formData.description)
    productData.append("discount", formData.discount)
    productData.append("stock", formData.stock)
    productData.append("category", formData.category)
    productData.append("subCategory", formData.subCategory)
    productData.append("searchKeywords", formData.keywords.join(","));

    formData.images.forEach((image) => {
      productData.append("images", image)
    })

    try {
      await createProduct(productData)
      navigate("/admin/products")
      showToast("Product added successfully", "success")
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
      <ProductFormHeader />

      <form 
        className="space-y-5"
        onSubmit={handleSubmit}
      >
        <ProductImageUpload 
          onChange={handleImageChange}
          onRemove={handleRemoveImage}
          images={formData.images}
          errors={errors}
        />

        <ProductBasicInfo 
          name={formData.name}
          description={formData.description}
          onChange={handleChange}
          errors={errors}
        />

        <ProductCategory 
          categories={categories}
          subCategories={subCategories}
          onChange={handleChange}
          category={formData.category}
          subCategory={formData.subCategory}
          errors={errors}
        />

        <ProductPricing 
          price={formData.price}
          discount={formData.discount}
          onChange={handleChange}
          errors={errors}
          mode={"add"}
        />

        <ProductInventory 
          stock={formData.stock}
          isActive={formData.isActive}
          onChange={handleChange}
          errors={errors}
        />

        <ProductSearchKeywords
          keywords={formData.keywords}
          onChange={handleKeywordsChange}
          error={errors.keywords}
        />


        <ProductFormActions 
          isSubmitting={isSubmitting}
        />
      </form>
    </div>
  );
}

export default AddProductPage;