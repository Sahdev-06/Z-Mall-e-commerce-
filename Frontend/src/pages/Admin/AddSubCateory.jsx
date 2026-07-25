import AdminLayout from "../../components/Admin/AdminLayout";
import PageHeader from "../../components/Admin/Common/PageHeader";
import SubCategoryForm from "../../components/Admin/SubCategories/SubCategoryForm";

function AddSubCategory() {
    return (
        <AdminLayout title="Add SubCategory">

            <PageHeader
                title="Add SubCategory"
                subtitle="Create a new sub category"
            />

            <SubCategoryForm />

        </AdminLayout>
    );
}

export default AddSubCategory;