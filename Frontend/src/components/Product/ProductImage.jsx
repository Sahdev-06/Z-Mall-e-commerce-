import { useState, useEffect } from "react"


function ProductImage({ images }) {
    const [selectedImage, setSelectedImage] = useState(images[0])

    useEffect(() => {
        setSelectedImage(images[0])
    }, [images])
    
    return (
        <>
            <div className="flex flex-col gap-4 md:flex-row-reverse">
                {/* Main Image */}
                <div className="aspect-square flex-1 overflow-hidden rounded-xl bg-gray-100">
                    <img
                        className="w-full h-full object-contain transition-transform
                                    duration-300 hover:scale-105" 
                        src={selectedImage}
                        alt="product"
                    />
                </div>
                {/* Thumbnails */}
                <div 
                    className="flex justify-center gap-3 overflow-x-auto md:w-16 md:flex-col
                                md:items-center md:justify-center"
                >
                    {
                        images.map((img) => (
                            <div className={`w-16 h-16 shrink-0 bg-white rounded-lg border cursor-pointer p-2
                                        overflow-hidden
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