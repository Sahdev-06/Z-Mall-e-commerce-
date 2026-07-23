const validateCategory = (formData, mode = "add") => {
    const errors = {};

    // Name
    if (!formData.name.trim()) {
        errors.name = "Category name is required.";
    } else if (formData.name.trim().length < 3) {
        errors.name = "Category name must be at least 3 characters.";
    }

    // Slug
    if (!formData.slug.trim()) {
        errors.slug = "Slug is required.";
    }

    // Description
    if (!formData.description.trim()) {
        errors.description = "Description is required.";
    } else if (formData.description.trim().length < 10) {
        errors.description =
            "Description must be at least 10 characters.";
    }

    // Image
    if (mode === "add") {

        if (!formData.image) {
            errors.image = "Please upload a category image.";
        }

    }

    return errors;
};

export default validateCategory;