import CouponFormHeader from "../components/AdminComponent/Coupons/CouponForm/CouponFormHeader";
import CouponBasicInfo from "../components/AdminComponent/Coupons/CouponForm/CouponBasicInfo";
import CouponOrderAmount from "../components/AdminComponent/Coupons/CouponForm/CouponOrderAmount";
import CouponExpiryDate from "../components/AdminComponent/Coupons/CouponForm/CouponExpiryDate";
import CouponFormActions from "../components/AdminComponent/Coupons/CouponForm/CouponFormActions";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import { createCoupon } from "../services/couponService";
import validateCoupon from "../utils/couponValidation";

function AddCouponPage() {
  const [formData, setFormData] = useState({
    code : "",
    discount : "",
    discountType : "",
    minimumOrderAmount : "",
    expiryDate : "",
    isActive : ""
  })

  const navigate = useNavigate();
  const { showToast } = useToast();

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData(prev => ({
      ...prev,
      [name] : value
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

    setIsSubmitting(true)

    const couponData = {
      code : formData.code,
      discount : formData.discount,
      discountType : formData.discountType,
      minimumOrderAmount : formData.minimumOrderAmount,
      expiryDate : formData.expiryDate
    }

    try {
      const result = await createCoupon(couponData)
      navigate("/admin/coupons")
      showToast("Coupon created successfully", "success")
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-5xl">
      <CouponFormHeader />

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
        />
      </form>
    </div>
  );
}

export default AddCouponPage;