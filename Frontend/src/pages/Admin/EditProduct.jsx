import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getProductByIdForAdmin } from "../../services/productService"
import Loading from "../../components/Common/Loading"
import ErrorState from "../../components/Common/ErrorState"
import AdminLayout from "../../components/Admin/AdminLayout"
import PageHeader from "../../components/Admin/Common/PageHeader"
import ProductForm from "../../components/Admin/Products/ProductForm"

function EditProduct() {
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const { id } = useParams()

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const result = await getProductByIdForAdmin(id)
                setProduct(result.data)
            } catch (error) {
                setError("Failed to load product")
            } finally {
                setLoading(false)
            }
        }

        fetchProduct();
    }, [id])

    if(loading) {
        return <Loading />
    }

    if(error) {
        return <ErrorState message={error}/>
    }
    
    return (
        <>
            <AdminLayout title={"Edit product"}>
                <PageHeader 
                    title={"Edit product"}
                    subtitle={"Edit your existing product"}
                />
                <ProductForm initialData={product} mode="edit" id={id} />
            </AdminLayout>
        </>
    )
}


export default EditProduct