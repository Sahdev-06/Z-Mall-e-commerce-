import CouponFormHeader from "../components/AdminComponent/Coupons/CouponForm/CouponFormHeader";
import CouponBasicInfo from "../components/AdminComponent/Coupons/CouponForm/CouponBasicInfo";
import CouponOrderAmount from "../components/AdminComponent/Coupons/CouponForm/CouponOrderAmount";
import CouponExpiryDate from "../components/AdminComponent/Coupons/CouponForm/CouponExpiryDate";
import CouponFormActions from "../components/AdminComponent/Coupons/CouponForm/CouponFormActions";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import { getCouponById, updateCoupon } from "../services/couponService";
import validateCoupon from "../utils/couponValidation";
import AdminPageLoader from "../components/AdminComponent/Layout/AdminPageLoader";

function AddCouponPage() {
  const [formData, setFormData] = useState({
    code : "",
    discount : "",
    discountType : "",
    minimumOrderAmount : "",
    expiryDate : "",
    isActive : ""
  })

  const { id } = useParams();

  const navigate = useNavigate();
  const { showToast } = useToast();

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCoupon = async () => {
        try {
            const coupon = await getCouponById(id)
            setFormData({
                code : coupon.data.code,
                discount : String(coupon.data.discount),
                discountType : coupon.data.discountType,
                minimumOrderAmount : String(coupon.data.minimumOrderAmount),
                expiryDate : coupon.data.expiryDate 
                                ? coupon.data.expiryDate.split("T")[0]
                                : "",
                isActive : coupon.data.isActive,
            })
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    fetchCoupon()
  }, [id])

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData(prev => ({
      ...prev,
      [name]: name === "isActive" ? value === "true" : value
    }))

    setErrors(prev => ({
      ...prev,
      [name] : ""
    }))
  }

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationErrors = validateCoupon(formData)

    if(Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    // setIsSubmitting(true)

    const couponData = {
      code : formData.code,
      discount : formData.discount,
      discountType : formData.discountType,
      minimumOrderAmount : formData.minimumOrderAmount,
      expiryDate : formData.expiryDate,
      isActive : formData.isActive
    }

    try {
      const result = await updateCoupon(id, couponData)
      navigate("/admin/coupons")
      showToast("Coupon updated successfully", "success")
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }

  }

  if(loading) {
    return <AdminPageLoader />
  }

  return (
    <div className="mx-auto w-full max-w-5xl">
      <CouponFormHeader 
        mode={"edit"}
      />

      <form 
        className="space-y-5"
        onSubmit={handleSubmit}
      >
        <CouponBasicInfo 
          code={formData.code}
          discount={formData.discount}
          discountType={formData.discountType}
          onChange={handleChange}
          errors={errors}
        />

        <CouponOrderAmount 
          minimumOrderAmount={formData.minimumOrderAmount}
          onChange={handleChange}
          errors={errors}
        />

        <CouponExpiryDate 
          expiryDate={formData.expiryDate}
          isActive={formData.isActive}
          onChange={handleChange}
          errors={errors}
        />

        <CouponFormActions 
          isSubmitting={isSubmitting}
          mode={"edit"}
        />
      </form>
    </div>
  );
}

export default AddCouponPage;