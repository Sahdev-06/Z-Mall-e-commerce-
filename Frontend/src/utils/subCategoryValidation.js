const validateSubCategory = (formData, mode = "add") => {
    const errors = {};

    // Name
    if (!formData.name.trim()) {
        errors.name = "Sub-category name is required.";
    } else if (formData.name.trim().length < 3) {
        errors.name = "Sub-category name must be at least 3 characters.";
    }

    // Slug
    if (!formData.slug.trim()) {
        errors.slug = "Slug is required.";
    }

    // Category
    if (!formData.category) {
        errors.category = "Please select a category.";
    }

    return errors;
};

export default validateSubCategory