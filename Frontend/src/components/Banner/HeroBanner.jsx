import bannerImage from "../../assets/Electronics.png"

function HeroBanner() {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 p-6 bg-white rounded-2xl
                            items-center shadow-sm">

                <div className="flex flex-col justify-center gap-4">
                    <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full 
                                    text-sm font-semibold self-start">
                        SUMMER SALE
                    </span>
                    <h1 className="text-4xl font-bold text-stale-900 leading-tight">
                        Up to 50% OFF
                    </h1>
                    <p className="text-gray-600 text-lg max-w-md">
                        Shop the best quality products at unbeatable prices
                    </p>
                    <button className=" bg-orange-500 text-white px-6 py-3 rounded-lg 
                                        font-medium self-start">
                        Shop Now
                    </button>
                </div >

                <div className="flex items-center justify-center">
                    <img 
                        src={bannerImage} alt="banner"
                        className="w-full max-h-[350px] object-contain"
                    />

                </div>
            </div>
        </>
    )
}


export default HeroBanner