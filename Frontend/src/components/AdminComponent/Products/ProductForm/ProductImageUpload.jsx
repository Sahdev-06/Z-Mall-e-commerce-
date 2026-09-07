import { ImagePlus, X } from "lucide-react";
import { useState, useEffect } from "react";


function ProductImageUpload({ images, onChange, onRemove, errors }) {
  const [previewImages, setPreviewImages] = useState([])

  useEffect(() => {
    if(images.length === 0) {
      setPreviewImages([])
      return
    }

    const urls = images.map((image) => {
      if(image instanceof File) {
        return URL.createObjectURL(image)
      }
       
      return image
    })

    setPreviewImages(urls)
    
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url))
    }

  }, [images])


  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-5">
        <h2 className="text-base font-semibold text-[#0B1F3A]">
          Product Images
        </h2>

        <p className="mt-1 text-xs text-gray-500">
          Upload multiple images. The first image will be used as the
          product thumbnail.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {/* Upload */}
        <label
          type="button"
          className={`flex aspect-square flex-col items-center justify-center rounded-xl border-2 
                      border-dashed ${errors.images ? "border-red-500" : "border-gray-300 "}
                      bg-gray-50 text-gray-400 transition-colors 
                      hover:border-[#F97316] hover:bg-orange-50 hover:text-[#F97316]`}
        >
          <input 
            type="file" 
            accept="image/*"
            hidden
            onChange={onChange}
            multiple
          />
          <ImagePlus size={25} strokeWidth={1.8} />

          <span className="mt-2 text-xs font-medium">
            Add Images
          </span>
          {errors.images && (
            <p className="mt-1.5 text-[11px] text-red-500">
              {errors.images}
            </p>
          )}
        </label>

        {/* Preview Images */}
        {previewImages.map((image, index) => (
          <div
            key={image}
            className="group relative aspect-square overflow-hidden rounded-xl border border-gray-200 bg-gray-100"
          >
            <img
              src={image}
              alt={`Product preview ${index + 1}`}
              className="h-full w-full object-cover"
            />

            {/* Remove */}
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white opacity-100 transition-colors hover:bg-red-600 sm:opacity-0 sm:group-hover:opacity-100"
              aria-label={`Remove image ${index + 1}`}
            >
              <X size={15} />
            </button>

            {/* Primary Image */}
            {index === 0 && (
              <span className="absolute bottom-2 left-2 rounded-md bg-[#0B1F3A]/90 px-2 py-1 text-[10px] font-medium text-white">
                Main Image
              </span>
            )}
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs text-gray-400">
        Recommended: JPG, PNG or WebP. Maximum 5MB per image.
      </p>
    </section>
  );
}

export default ProductImageUpload;

