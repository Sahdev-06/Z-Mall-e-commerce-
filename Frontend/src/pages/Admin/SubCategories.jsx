import PageHeader from "../../components/Admin/Common/PageHeader"
import SubCategoryFilter from "../../components/Admin/SubCategories/SubCategoryFilter"
import SubCategoryTable from "../../components/Admin/SubCategories/SubCategoryTable"
import Pagination from "../../components/Admin/Common/Pagination"
import AdminLayout from "../../components/Admin/AdminLayout"

function SubCategories() {
    return (
        <>
            <AdminLayout title="SubCategories">
                <PageHeader
                    title={"SubCategories"} 
                    subtitle={"Manage your all sub categories"} 
                    buttonText={"Add Sub Category"}
                />
                <SubCategoryFilter />
                <SubCategoryTable />
                <Pagination />
            </AdminLayout>
        </>
    )
}


export default SubCategories