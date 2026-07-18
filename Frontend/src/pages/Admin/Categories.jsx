import PageHeader from "../../components/Admin/Common/PageHeader"
import CategoryFilter from "../../components/Admin/Categories/CategoryFilter"
import CategoryTable from "../../components/Admin/Categories/CategoryTable"
import Pagination from "../../components/Admin/Common/Pagination"
import AdminLayout from "../../components/Admin/AdminLayout"

function Categories() {
    return (
        <>
            <AdminLayout title="Categories">
                <PageHeader
                    title={"Categories"} 
                    subtitle={"Manage your all categories"} 
                    buttonText={"Add Category"}
                />
                <CategoryFilter />
                <CategoryTable />
                <Pagination />
            </AdminLayout>
        </>
    )
}


export default Categories