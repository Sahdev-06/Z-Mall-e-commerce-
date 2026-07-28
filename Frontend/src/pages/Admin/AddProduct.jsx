import AdminLayout from "../../components/Admin/AdminLayout";
import PageHeader from "../../components/Admin/Common/PageHeader";
import ProductForm from "../../components/Admin/Products/ProductForm";

function AddProduct() {
    return (
        <AdminLayout title="Add Product">

            <PageHeader
                title="Add Product"
                subtitle="Create a new Product"
            />

            <ProductForm />

        </AdminLayout>
    );
}

export default AddProduct;