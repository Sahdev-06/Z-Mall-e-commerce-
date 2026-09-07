import CategoriesPageHeader from "../components/AdminComponent/Categories/CategoriesPageHeader";
import CategoriesToolbar from "../components/AdminComponent/Categories/CategoriesToolbar";
import CategoriesTable from "../components/AdminComponent/Categories/CategoriesTable";
import { useState, useEffect } from "react";
import { getAllCategories, deleteCategory } from "../services/categoryService";
import { useToast } from "../context/ToastContext";
import AdminPageLoader from "../components/AdminComponent/Layout/AdminPageLoader"
import ConfirmationModal from "../components/AdminComponent/AdminCommon/ConfirmationModal";


function CategoriesPage() {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [totalCategories, setTotalCategories] = useState(0)
    const [search, setSearch] = useState("")
    const [appliedSearch, setAppliedSearch] = useState("")

    const limit = 3;

    const { showToast } = useToast();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const result = await getAllCategories(currentPage, limit, appliedSearch)
                setCategories(result.data.categories)
                setCurrentPage(result.data.currentPage)
                setTotalPages(result.data.totalPages)
                setTotalCategories(result.data.totalCategories)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        fetchCategories()
    }, [currentPage, appliedSearch])

    // handle delete category
    const handleDeleteCategory = async () => {
        try {
            await deleteCategory(selectedCategory._id)

            setCategories(
                categories.filter(category => category._id !== selectedCategory._id)
            )

            setIsModalOpen(false)
            setSelectedCategory(null)

            showToast("Category deleted successfully", "success")
        } catch (error) {
            console.log(error)
        }
    }

    // reset search filters
    const handleReset = () => {
        setSearch("")
        setAppliedSearch("")
        setCurrentPage(1)
    }

    if(loading) {
        return <AdminPageLoader />
    }

    return (
        <div className="mx-auto w-full max-w-[1600px]">
            <CategoriesPageHeader />

            <CategoriesToolbar
                search={search}
                setSearch={setSearch}
                onSearch={() => {
                    setAppliedSearch(search)
                    setCurrentPage(1)
                }}
                onReset={handleReset}
            />

            <CategoriesTable 
                categories={categories}
                setIsModalOpen={setIsModalOpen}
                setSelectedCategory={setSelectedCategory}

                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
                totalCategories={totalCategories}
                limit={limit}
            />

            {isModalOpen && (
                <ConfirmationModal 
                    title={"Delete Category"}
                    subtitle={`Are you sure you want to delete "${selectedCategory.name}"?`}
                    onCancel={() => {
                        setIsModalOpen(false)
                        setSelectedCategory(null)
                    }}
                    onConfirm={handleDeleteCategory}
                />
            )}
        </div>
    );
}

export default CategoriesPage;