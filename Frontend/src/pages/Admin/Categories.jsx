import PageHeader from "../../components/Admin/Common/PageHeader"
import CategoryFilter from "../../components/Admin/Categories/CategoryFilter"
import CategoryTable from "../../components/Admin/Categories/CategoryTable"
import Pagination from "../../components/Admin/Common/Pagination"
import AdminLayout from "../../components/Admin/AdminLayout"
import { useEffect, useState } from "react"
import { getAllCategories, deleteCategory } from "../../services/categoryService"
import Loading from "../../components/Common/Loading"
import EmptyState from "../../components/Common/EmptyState"
import ErrorState from "../../components/Common/ErrorState"
import ConfirmationModal from "../../components/Admin/Common/ConfirmationModal"


function Categories() {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const[isModalOpen, setIsModalOpen] = useState(false)
    const[selectedCategory, setSelectedCategory] = useState(null)

    useEffect(() => {

        const fetchCategories = async () => {
            try {
                const result = await getAllCategories()

                setCategories(result.data)
                
            } catch (err) {
                setError("Failed to load categories")
                
            } finally {
                setLoading(false)
            }
        }

        fetchCategories()

    }, [])

    if(loading) {
        return <Loading />
    }

    if(error) {
        return <ErrorState message={error}/>
    }

    if(categories.length === 0) {
        return <EmptyState 
                    title={"No categories found"} 
                    subtitle={"Create your first category"}
                />
    }

    async function handleDeleteCategory() {
        try {
            await deleteCategory(selectedCategory._id)
    
            setCategories(
                categories.filter(category => category._id !== selectedCategory._id)
            )
    
            setIsModalOpen(false)
            setSelectedCategory(null)
        } catch (error) {
            setError("Failed to delete category")
        }
    }

    return (
        <>
            <AdminLayout title="Categories">
                <PageHeader
                    title={"Categories"} 
                    subtitle={"Manage your all categories"} 
                    buttonText={"Add Category"}
                    resource={"category"}
                />
                <CategoryFilter />
                <CategoryTable 
                    categories={categories}
                    modal={setIsModalOpen}
                    selectedCategory={setSelectedCategory}
                />
                {
                    isModalOpen && (
                        <ConfirmationModal 
                            isOpen={isModalOpen}
                            title={"Delete Category"}
                            message={`Are you sure you want to delete "${selectedCategory?.name}"?`}
                            onCancel={() => {
                                setIsModalOpen(false)
                                setSelectedCategory(null)
                            }}
                            onConfirm={handleDeleteCategory}
                        />
                    )
                }
                <Pagination />
            </AdminLayout>
        </>
    )
}


export default Categories