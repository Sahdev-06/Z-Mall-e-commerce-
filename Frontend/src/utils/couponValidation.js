const validateCoupon = (formData) => {
    const errors = {}

    // CODE
    if(!formData.code.trim()) {
        errors.code = "Coupon code is required"
    }

    // Discount
    if(!formData.discount.trim()) {
        errors.discount = "Discount is required"
    }

    // Discount Type
    if(!formData.discountType) {
        errors.discountType = "Discount type is required"
    }

    // Minimum order requirement
    if(!formData.minimumOrderAmount.trim()) {
        errors.minimumOrderAmount = "Minimum order amount is required"
    }

    // Expiry date
    if(!formData.expiryDate) {
        errors.expiryDate = "Expiry date is required"
    }

    return errors
}


export default validateCoupon