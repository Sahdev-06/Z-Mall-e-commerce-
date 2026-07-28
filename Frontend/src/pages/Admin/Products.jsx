import { useState, useEffect } from "react"
import { getAllProductsForAdmin, deleteProduct } from "../../services/productService.js"
import PageHeader from "../../components/Admin/Common/PageHeader"
import ProductFilter from "../../components/Admin/Products/ProductFilters"
import ProductTable from "../../components/Admin/Products/ProductTable"
import Pagination from "../../components/Admin/Common/Pagination"
import AdminLayout from "../../components/Admin/AdminLayout"
import Loading from "../../components/Common/Loading"
import EmptyState from "../../components/Common/EmptyState"
import ErrorState from "../../components/Common/ErrorState"
import ConfirmationModal from "../../components/Admin/Common/ConfirmationModal"

function Products() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const result = await getAllProductsForAdmin()
                setProducts(result.data)
            } catch (error) {
                setError("Failed to load products")
            } finally {
                setLoading(false)
            }
        }

        fetchAllProducts()
    }, [])

    if(loading) {
        return <Loading />
    }

    if(error) {
        return <ErrorState message={error} />
    }

    if(products.length === 0) {
        return <EmptyState 
                    title={"No products found"}
                    subtitle={"Create your first product"}
               />
    }

    const handleDeleteProduct = async () => {
        try {
            await deleteProduct(selectedProduct._id)

            setProducts(
                products.filter(product => product._id !== selectedProduct._id)
            )

            setIsModalOpen(false)
            setSelectedProduct(null)
        } catch (error) {
            setError("Failed to delete product")
        }
    }

    return (
        <>
            <AdminLayout title="Products">
                <PageHeader 
                    title={"Products"} 
                    subtitle={"Manage your all products"} 
                    buttonText={"Add Product"}
                    resource={"product"}
                />
                <ProductFilter />
                <ProductTable 
                    products={products}
                    modal={setIsModalOpen}
                    selectedProduct={setSelectedProduct}
                />
                {
                    isModalOpen && (
                        <ConfirmationModal 
                            isOpen={isModalOpen}
                            title={"Delete product"}
                            message={`Are you sure you want to delete ${selectedProduct?.name}?`}
                            onCancel={() => {
                                setIsModalOpen(false)
                                setSelectedProduct(null)
                            }}
                            onConfirm={handleDeleteProduct}
                        />
                    )
                }
                <Pagination />
            </AdminLayout>
        </>
    )
}


export default Products