import { useState } from "react"
import image from "../../assets/image"

function ProductImage({ images }) {
    const [selectedImage, setSelectedImage] = useState(image[0])
    return (
        <>
            <div>
                <div className="bg-white rounded-2xl shadow-sm p-8 flex justify-center items-center">
                    <img
                        className="w-full max-h-[450px] object-contain transition-transform
                                    duration-300 hover:scale-105" 
                        src={selectedImage}
                        alt="product"
                    />
                </div>
                <div className="flex justify-center gap-4 mt-6">
                    {
                        image.map((img) => (
                            <div className={`w-20 h-20 bg-white rounded-xl border cursor-pointer p-2
                                            ${selectedImage === img ? "border-orange-500" : "border-gray-200"}`}
                                onClick={() => setSelectedImage(img)}
                                key={img}>
                                <img 
                                    className="w-full h-full object-contain"
                                    src={img}
                                    alt="product thumbnail"
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}



export default ProductImage