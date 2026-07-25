import PageHeader from "../../components/Admin/Common/PageHeader"
import SubCategoryFilter from "../../components/Admin/SubCategories/SubCategoryFilter"
import SubCategoryTable from "../../components/Admin/SubCategories/SubCategoryTable"
import Pagination from "../../components/Admin/Common/Pagination"
import AdminLayout from "../../components/Admin/AdminLayout"
import { useState, useEffect } from "react"
import Loading from "../../components/Common/Loading"
import ErrorState from "../../components/Common/ErrorState"
import EmptyState from "../../components/Common/EmptyState"
import ConfirmationModal from "../../components/Admin/Common/ConfirmationModal"
import { getAllSubCategories, deleteSubCategory } from "../../services/subCategoryService"

function SubCategories() {
    const [subCategories, setSubCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedSubCategory, setSelectedSubCategory] = useState(null)

    useEffect(() => {
        const fetchSubCategories = async () => {
            try {
                const result = await getAllSubCategories()
                setSubCategories(result.data)
            } catch (error) {
                setError("Failed to load subCategories")
            } finally {
                setLoading(false)
            }
        }

        fetchSubCategories();
    }, [])

    if(loading) {
        return <Loading />
    }

    if(error) {
        return <ErrorState message={error}/>
    }

    if(subCategories.length === 0) {
        return <EmptyState
                    title={"No subCategories found"}
                    subtitle={"Create your first subCategory"} 
               />
    }

    const handleDeleteSubCategory = async () => {
        try {
            await deleteSubCategory(selectedSubCategory._id)

            setSubCategories(
                subCategories.filter(subCategory => subCategory._id !== selectedSubCategory._id)
            )

            setIsModalOpen(false)
            setSelectedSubCategory(null)
        } catch (error) {
            setError("Failed to delete SubCategory")
        }
    }

    return (
        <>
            <AdminLayout title="SubCategories">
                <PageHeader
                    title={"SubCategories"} 
                    subtitle={"Manage your all sub categories"} 
                    buttonText={"Add Sub Category"}
                    resource={"sub-category"}
                />
                <SubCategoryFilter />
                <SubCategoryTable 
                    subCategories={subCategories}
                    modal={setIsModalOpen}
                    selectedSubCategory={setSelectedSubCategory}
                />
                {
                    isModalOpen && (
                        <ConfirmationModal 
                            isOpen={isModalOpen}
                            title={"Delete SubCategory"}
                            message={`Are you sure you want to delete ${selectedSubCategory?.name}?`}
                            onCancel={() => {
                                setIsModalOpen(false)
                                setSelectedSubCategory(null)
                            }}
                            onConfirm={handleDeleteSubCategory}
                        />
                    )
                }
                <Pagination />
            </AdminLayout>
        </>
    )
}


export default SubCategories