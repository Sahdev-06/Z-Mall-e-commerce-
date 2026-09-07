import { ImagePlus, Upload, X } from "lucide-react";
import { useEffect, useState } from "react";

function CategoryImageUpload({ image, onChange, onRemove, errors }) {
  const [previewImage, setPreviewImage] = useState(null)

  useEffect(() => {
    if(!image) {
      setPreviewImage(null)
      return
    }

    if(image instanceof File) {
      const url = URL.createObjectURL(image)
      setPreviewImage(url)

      return () => {
        URL.revokeObjectURL(url)
      }
    }

    setPreviewImage(image)
  },[image])


  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-5">
        <h2 className="text-base font-semibold text-[#0B1F3A]">
          Category Image
        </h2>

        <p className="mt-1 text-xs text-gray-500">
          Upload a single image for this category.
        </p>
      </div>

      <div className="flex flex-col gap-5 sm:flex-row">
        {/* Preview */}
        {image && (<div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-xl border border-gray-200 
                        bg-gray-100">
          <img
            src={previewImage}
            alt="Category preview"
            className="h-full w-full object-cover"
          />

          <button
            type="button"
            onClick={onRemove}
            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full 
                      bg-black/60 text-white transition-colors hover:bg-red-600"
            aria-label="Remove category image"
          >
            <X size={16} />
          </button>
        </div>)
        }

        {/* Upload Area */}
        <label
          type="button"
          className={`flex min-h-40 flex-1 flex-col items-center justify-center rounded-xl border-2 
                    border-dashed ${errors.image ? "border-red-500" : "border-gray-300"} bg-gray-50 px-4 text-center transition-colors 
                    hover:border-[#F97316] hover:bg-orange-50`}
        >
          <input 
            type="file" 
            accept="image/*"
            hidden
            onChange={onChange}
          />
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-100 text-[#F97316]">
            <ImagePlus size={22} />
          </div>

          <div className="mt-3 flex items-center gap-1 text-sm">
            <span className="font-semibold text-[#F97316]">
              Click to upload
            </span>

            <span className="text-gray-500">
              or drag and drop
            </span>
          </div>

          <p className="mt-1 text-xs text-gray-400">
            JPG, PNG or WebP · Max 5MB
          </p>

          {errors.image && (
            <p className="mt-2 text-xs text-red-500">
              {errors.image}
            </p>
          )}

          <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-gray-500">
            <Upload size={14} />
            Upload image
          </div>
        </label>
      </div>
    </section>
  );
}

export default CategoryImageUpload;