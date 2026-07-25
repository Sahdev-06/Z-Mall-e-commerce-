import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getSubCategoryById } from "../../services/subCategoryService"
import SubCategoryForm from "../../components/Admin/SubCategories/SubCategoryForm"
import Loading from "../../components/Common/Loading"
import ErrorState from "../../components/Common/ErrorState"
import AdminLayout from "../../components/Admin/AdminLayout"
import PageHeader from "../../components/Admin/Common/PageHeader"


function EditSubCategory() {
    const [subCategory, setSubCategory] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const { id } = useParams()

    useEffect(() => {
        const fetchSubCategory = async () => {
            try {
                const result = await getSubCategoryById(id)
                setSubCategory(result.data)
            } catch (error) {
                console.log(error)
                setError("Failed to load subCategories")
            } finally {
                setLoading(false)
            }
        }

        fetchSubCategory()
    }, [id])

    if(loading) {
        return <Loading />
    }

    if(error) {
        return <ErrorState
                    message={error} 
               />
    }

    return (
        <>
            <AdminLayout title={"Edit subCategory"}>

                <PageHeader 
                    title={"Edit subCategory"}
                    subtitle={"Edit your existing subSategory"}
                />

                <SubCategoryForm initialData={subCategory} mode="edit" id={id} />
            </AdminLayout>
        </>
    )
}



export default EditSubCategory