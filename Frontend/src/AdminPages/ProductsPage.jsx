import ProductsPageHeader from "../components/AdminComponent/Products/ProductsPageHeader";
import ProductsToolbar from "../components/AdminComponent/Products/ProductsToolbar";
import ProductsTable from "../components/AdminComponent/Products/ProductsTable";
import { useState, useEffect } from "react";
import { getAllProductsForAdmin, deleteProduct } from "../services/productService";
import { getAllCategories } from "../services/categoryService";
import AdminPageLoader from "../components/AdminComponent/Layout/AdminPageLoader";
import { useToast } from "../context/ToastContext";
import ConfirmationModal from "../components/AdminComponent/AdminCommon/ConfirmationModal"


function ProductsPage() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalProducts, setTotalProducts] = useState(0)
  const [search, setSearch] = useState("")
  const [appliedSearch, setAppliedSearch] = useState("")
  const [category, setCategory] = useState("")

  const limit = 40;

  const { showToast } = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await getAllProductsForAdmin(currentPage, limit, appliedSearch, category)
        const categoryData = await getAllCategories()
        setCategories(categoryData.data.categories)
        setProducts(result.data.product)
        setCurrentPage(result.data.currentPage)
        setTotalPages(result.data.totalPages)
        setTotalProducts(result.data.totalProducts)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [currentPage, appliedSearch, category])

  // handle delete product
  const handleDeleteProduct = async () => {
    try {
      await deleteProduct(selectedProduct._id)

      setProducts(
        products.filter(product => product._id !== selectedProduct._id)
      )

      showToast("Product deleted successfully", "success")

      setIsModalOpen(false)
      setSelectedProduct(null)
    } catch (error) {
      console.log(error)
    }
  }

  // handle reset search filter
  const handleReset = () => {
    setSearch("")
    setAppliedSearch("")
    setCategory("")
    setCurrentPage(1)
  }

  if(loading) {
    return <AdminPageLoader />
  }


  return (
    <div className="mx-auto w-full max-w-[1600px]">
      <ProductsPageHeader />

      <ProductsToolbar 
        categories={categories}
        search={search}
        setSearch={setSearch}
        onSearch={() => {
          setAppliedSearch(search)
          setCurrentPage(1)
        }}
        category={category}
        setCategory={setCategory}
        onCategoryChange={() => {
          setCurrentPage(1)
        }}
        onReset={handleReset}
      />

      <ProductsTable 
        products={products}
        setSelectedProduct={setSelectedProduct}
        setIsModalOpen={setIsModalOpen}

        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        totalProducts={totalProducts}
        limit={limit}
      />

      {isModalOpen && (
        <ConfirmationModal 
          title={"Delete product"}
          subtitle={`Are you sure you want to delete "${selectedProduct.name}?"`}
          onCancel={() => {
            setIsModalOpen(false)
            setSelectedProduct(null)
          }}
          onConfirm={handleDeleteProduct}
        />
      )}
    </div>
  );
}

export default ProductsPage;

