const validateProduct = (formData) => {
    const errors = {}

    // Name
    if (!formData.name.trim()) {
        errors.name = "Product name is required"
    } else if (formData.name.trim().length < 3) {
        errors.name = "Product name must be at least 3 characters"
    }

    // Category
    if (!formData.category) {
        errors.category = "Please select a category"
    }

    // Sub-Cateogry
    if (!formData.subCategory) {
        errors.subCategory = "Please select a sub-category"
    }

    // Description
    if (!formData.description.trim()) {
        errors.description = "Product description is required"
    }

    // Price
    if (!formData.price) {
        errors.price = "Price is required"
    }

    // Images
    if(formData.images.length === 0) {
        errors.images = "Upload at least one image"
    }

    return errors
}

const validateProductUpdate = (formData) => {
    const errors = {}

     // Name
    if (!formData.name.trim()) {
        errors.name = "Product name is required"
    } else if (formData.name.trim().length < 3) {
        errors.name = "Product name must be at least 3 characters"
    }

    // Description
    if (!formData.description.trim()) {
        errors.description = "Product description is required"
    }

    // Price
    if (!formData.price) {
        errors.price = "Price is required"
    }

    // Images
    if(formData.images.length === 0) {
        errors.images = "Upload at least one image"
    }

    return errors
}


export {
    validateProduct,
    validateProductUpdate
}
