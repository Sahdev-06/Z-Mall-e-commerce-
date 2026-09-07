import ProductFormHeader from "../components/AdminComponent/Products/ProductForm/ProductFormHeader";
import ProductImageUpload from "../components/AdminComponent/Products/ProductForm/ProductImageUpload";
import ProductBasicInfo from "../components/AdminComponent/Products/ProductForm/ProductBasicInfo";
import ProductPricing from "../components/AdminComponent/Products/ProductForm/ProductPricing";
import ProductFormActions from "../components/AdminComponent/Products/ProductForm/ProductFormActions";
import ProductSearchKeywords from "../components/AdminComponent/Products/ProductForm/ProductSearchKeywords";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import { updateProduct, getProductByIdForAdmin } from "../services/productService";
import { validateProductUpdate } from "../utils/productValidation";
import AdminPageLoader from "../components/AdminComponent/Layout/AdminPageLoader";

function AddProductPage() {
  const [formData, setFormData] = useState({
    name : "",
    price : "",
    description : "",
    images : [],
    keywords : []
  })

  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchdata = async () => {
      try {

        const product = await getProductByIdForAdmin(id)

        setFormData({
            name : product.data.name,
            price : product.data.price,
            description : product.data.description,
            images : product.data.images,
            keywords : product.data.searchKeywords
        })

      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchdata()
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


  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationErrors = validateProductUpdate(formData)

    if(Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)

    const productData = new FormData()

    productData.append("name", formData.name)
    productData.append("price", formData.price)
    productData.append("description", formData.description)
    productData.append(
      "searchKeywords",
      formData.keywords.join(",")
    );


    formData.images.forEach((image) => {
      if(image instanceof File) {
        productData.append("images", image)
      }
    })

    try {
      await updateProduct(id, productData)
      navigate("/admin/products")
      showToast("Product updated successfully", "success")
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
      <ProductFormHeader 
        mode={"edit"}
      />

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

        <ProductPricing 
          price={formData.price}
          discount={formData.discount}
          onChange={handleChange}
          errors={errors}
        />

        <ProductSearchKeywords
          keywords={formData.keywords}
          onChange={(keywords) =>
            setFormData((prev) => ({
              ...prev,
              keywords,
            }))
          }
          error={errors.keywords}
        />


        <ProductFormActions 
          isSubmitting={isSubmitting}
          mode={"edit"}
        />
      </form>
    </div>
  );
}

export default AddProductPage;