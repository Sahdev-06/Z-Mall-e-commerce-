import { useParams } from "react-router-dom"
import { getCategoryById } from "../../services/categoryService"
import { useEffect, useState } from "react"
import Loading from "../../components/Common/Loading"
import ErrorState from "../../components/Common/ErrorState"
import CategoryForm from "../../components/Admin/Categories/CategoryForm"
import AdminLayout from "../../components/Admin/AdminLayout"
import PageHeader from "../../components/Admin/Common/PageHeader"

function EditCategory() {
    const [category, setCategory] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const { id } = useParams()

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const result = await getCategoryById(id)
                setCategory(result.data)
            } catch (error) {
                console.log(error)
                setError("Failed to load category")
            } finally {
                setLoading(false)
            }
        }

        fetchCategory()
    }, [id])

    if(loading) {
        return <Loading />
    }

    if(error) {
        return <ErrorState message={error}/>
    }

    return (
        <>
            <AdminLayout title={"Edit category"}>

                <PageHeader 
                    title={"Edit category"}
                    subtitle={"Edit your existing category"}
                />

                <CategoryForm initialData={category} mode="edit" id={id}/>
            </AdminLayout>
        </>
    )
}


export default EditCategory