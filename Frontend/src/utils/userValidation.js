const validateUser = (formData) => {
    const errors = {};

    // Name
    if (!formData.fullName.trim()) {
        errors.fullName = "Full Name is required."
    } else if (formData.fullName.trim().length < 3) {
        errors.fullName = "Full Name must be at least 3 characters."
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!formData.email.trim()) {
        errors.email = "Email is required."
    } else if (!emailRegex.test(formData.email.trim())) {
        errors.email = "Invalid email format.";
    }

    // Phone
    const phoneRegex = /^\d{10}$/;

    if (!formData.phone.trim()) {
        errors.phone = "Phone is required."
    } else if (!phoneRegex.test(formData.phone.trim())) {
        errors.phone = "Phone must be exactly 10 digits.";
    }

    // Password
    if (!formData.password.trim()) {
        errors.password = "Password is required."
    } else if (formData.password.trim().length < 8) {
        errors.password = "Password must be at least 8 character."
    }

    return errors;
}

export default validateUser