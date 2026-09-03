import CouponsPageHeader from "../components/AdminComponent/Coupons/CouponsPageHeader";
import CouponsToolbar from "../components/AdminComponent/Coupons/CouponsToolbar";
import CouponsTable from "../components/AdminComponent/Coupons/CouponsTable";
import { useState, useEffect } from "react";
import { useToast } from "../context/ToastContext";
import { getAllCoupons } from "../services/couponService"
import { deleteCoupon } from "../services/couponService";
import AdminPageLoader from "../components/AdminComponent/Layout/AdminPageLoader";
import ConfirmationModal from "../components/AdminComponent/AdminCommon/ConfirmationModal"


function CouponsPage() {
  const [coupons, setCoupons] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCoupon, setSelectedCoupon] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalCoupons, setTotalCoupons] = useState(0)
  const [search, setSearch] = useState("")
  const [appliedSearch, setAppliedSearch] = useState("")
  const [type, setType] = useState("")

  const limit = 10;

  const { showToast } = useToast();

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const result = await getAllCoupons(currentPage, limit, appliedSearch, type)
        setCoupons(result.data.coupons)
        setCurrentPage(result.data.currentPage)
        setTotalPages(result.data.totalPages)
        setTotalCoupons(result.data.totalCoupons)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchCoupons()
  }, [currentPage, appliedSearch, type])

  //handle delete coupon
  const handleDeleteCoupon = async () => {
    try {
      await deleteCoupon(selectedCoupon._id)

      setCoupons(
        coupons.filter(coupon => coupon._id !== selectedCoupon._id)
      )

      showToast("Coupon deleted successfully", "success")

      setIsModalOpen(false)
      setSelectedCoupon(null)
    } catch (error) {
      console.log(error)
    }
  }

  // handle reset filters and search
  const handleReset = () => {
    setSearch("");
    setAppliedSearch("");
    setType("");
    setCurrentPage(1);
  };


  if(loading) {
    return <AdminPageLoader />
  }


  return (
    <div className="mx-auto w-full max-w-[1600px]">
      <CouponsPageHeader />

      <CouponsToolbar 
        search={search}
        setSearch={setSearch}
        onSearch={() => {
          setAppliedSearch(search)
          setCurrentPage(1)
        }}
        type={type}
        setType={setType}
        onTypeChange={() => {
          setCurrentPage(1);
        }}
        onReset={handleReset}
      />

      <CouponsTable 
        coupons={coupons}
        setIsModalOpen={setIsModalOpen}
        setSelectedCoupon={setSelectedCoupon}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        totalCoupons={totalCoupons}
        limit={limit}
      />

      {
        isModalOpen && (
          <ConfirmationModal 
            title={"Delete Coupon"}
            subtitle={`Are you sure you want to delete "${selectedCoupon.code}"?`}
            onCancel={() => {
              setIsModalOpen(false)
              setSelectedCoupon(null)
            }}
            onConfirm={handleDeleteCoupon}
          />
        )
      }
    </div>
  );
}

export default CouponsPage;