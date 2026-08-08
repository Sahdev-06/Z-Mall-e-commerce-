const validateAddress = (formData) => {
    const errors = {};

    // Full Name
    if (!formData.fullName.trim()) {
        errors.fullName = "Full Name is required.";
    } else if (formData.fullName.trim().length < 3) {
        errors.fullName = "Full Name must be at least 3 characters.";
    }

    // Phone Number
    const phoneRegex = /^\d{10}$/;

    if (!formData.phoneNumber.trim()) {
        errors.phoneNumber = "Phone Number is required.";
    } else if (!phoneRegex.test(formData.phoneNumber.trim())) {
        errors.phoneNumber = "Phone Number must be exactly 10 digits.";
    }

    // Street
    if (!formData.street.trim()) {
        errors.street = "Street address is required.";
    } 

    // City
    if (!formData.city.trim()) {
        errors.city = "City is required.";
    } 

    // State
    if (!formData.state.trim()) {
        errors.state = "State is required.";
    }

    // Postal Code
    const postalCodeRegex = /^\d{6}$/;

    if (!formData.postalCode.trim()) {
        errors.postalCode = "Postal Code is required.";
    } else if (!postalCodeRegex.test(formData.postalCode.trim())) {
        errors.postalCode = "Postal Code must be exactly 6 digits.";
    }

    return errors;
};

export default validateAddress;