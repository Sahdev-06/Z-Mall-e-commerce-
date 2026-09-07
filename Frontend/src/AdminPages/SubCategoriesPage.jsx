import SubCategoriesPageHeader from "../components/AdminComponent/SubCategories/SubCategoriesPageHeader";
import SubCategoriesToolbar from "../components/AdminComponent/SubCategories/SubCategoriesToolbar";
import SubCategoriesTable from "../components/AdminComponent/SubCategories/SubCategoriesTable";
import { useState, useEffect } from "react";
import { getAllSubCategories, deleteSubCategory } from "../services/subCategoryService";
import { getAllCategories } from "../services/categoryService";
import { useToast } from "../context/ToastContext";
import AdminPageLoader from "../components/AdminComponent/Layout/AdminPageLoader";
import ConfirmationModal from "../components/AdminComponent/AdminCommon/ConfirmationModal"

function SubCategoriesPage() {
  const [subCategories, setSubCategories] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedSubCategory, setSelectedSubCategory] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalSubCategories, setTotalSubCategories] = useState(0)
  const [search, setSearch] = useState("")
  const [appliedSearch, setAppliedSearch] = useState("")
  const [category, setCategory] = useState("")

  const limit = 10;

  const { showToast } = useToast();

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const result = await getAllSubCategories(currentPage, limit, appliedSearch, category)
        const categoryData = await getAllCategories()
        setCategories(categoryData.data.categories)
        setSubCategories(result.data.subCategories)
        setCurrentPage(result.data.currentPage)
        setTotalPages(result.data.totalPages)
        setTotalSubCategories(result.data.totalSubCategories)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchSubCategories()
  }, [currentPage, appliedSearch, category])

  // handle delete sub-category
  const handleDeleteSubCategory = async () => {
    try {
      await deleteSubCategory(selectedSubCategory._id)

      setSubCategories(
        subCategories.filter(subCategory => subCategory._id !== selectedSubCategory._id)
      )

      setIsModalOpen(false)
      setSelectedSubCategory(null)

      showToast("Sub-category deleted successfully", "success")
    } catch (error) {
      console.log(error)
    }
  }

  // handle reset filters and search filter
  const handleReset = () => {
    setSearch("");
    setAppliedSearch("");
    setCategory("");
    setCurrentPage(1);
  }

  if(loading) {
    return <AdminPageLoader />
  }

  return (
    <div className="mx-auto w-full max-w-[1600px]">
      <SubCategoriesPageHeader />

      <SubCategoriesToolbar 
        categories={categories}
        search={search}
        setSearch={setSearch}
        onSearch={() => {
          setAppliedSearch(search)
          setCurrentPage(1)
        }}
        category={category}
        setCategory={setCategory}
        onCategoryChange={() => {
          setCurrentPage(1)
        }}
        onReset={handleReset}
      />

      <SubCategoriesTable 
        subCategories={subCategories}
        setSelectedSubCategory={setSelectedSubCategory}
        setIsModalOpen={setIsModalOpen}

        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        totalSubCategories={totalSubCategories}
        limit={limit}
      />

      {isModalOpen && (
        <ConfirmationModal 
          title={"Delete Sub-category"}
          subtitle={`Are you sure you want to delete "${selectedSubCategory.name}?"`}
          onCancel={() => {
            setIsModalOpen(false)
            setSelectedSubCategory(null)
          }}
          onConfirm={handleDeleteSubCategory}
        />
      )}
    </div>
  );
}

export default SubCategoriesPage;