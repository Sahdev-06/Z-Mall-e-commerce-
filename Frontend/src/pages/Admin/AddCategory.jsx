import AdminLayout from "../../components/Admin/AdminLayout";
import PageHeader from "../../components/Admin/Common/PageHeader";
import CategoryForm from "../../components/Admin/Categories/CategoryForm";

function AddCategory() {
    return (
        <AdminLayout title="Add Category">

            <PageHeader
                title="Add Category"
                subtitle="Create a new category"
            />

            <CategoryForm />

        </AdminLayout>
    );
}

export default AddCategory;