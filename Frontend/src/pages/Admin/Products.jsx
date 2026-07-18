import PageHeader from "../../components/Admin/Common/PageHeader"
import ProductFilter from "../../components/Admin/Products/ProductFilters"
import ProductTable from "../../components/Admin/Products/ProductTable"
import Pagination from "../../components/Admin/Common/Pagination"
import AdminLayout from "../../components/Admin/AdminLayout"

function Product() {
    return (
        <>
            <AdminLayout title="Products">
                <PageHeader 
                    title={"Products"} 
                    subtitle={"Manage your all products"} 
                    buttonText={"Add Product"}
                />
                <ProductFilter />
                <ProductTable />
                <Pagination />
            </AdminLayout>
        </>
    )
}


export default Product