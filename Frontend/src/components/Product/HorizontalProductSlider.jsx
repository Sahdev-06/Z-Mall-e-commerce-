import ProductCard from "./ProductCard"
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";

function HorizontalProductSlider({ products, title, type }) {
    const sliderRef = useRef(null);

    const handleScroll = (direction) => {
        if (!sliderRef.current) return;

        const scrollAmount = sliderRef.current.clientWidth * 0.8;

        sliderRef.current.scrollBy({
            left: direction === "next" ? scrollAmount : -scrollAmount,
            behavior: "smooth",
        });
    };

    return (
        <>
            <section className="w-full ">
                {/* Header */}
                <div className="mb-4 flex items-center justify-between gap-4">
                    <h2 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl md:text-2xl">
                        {title}
                    </h2>
    
                    <div className="flex items-center gap-3">
                        {/* Tablet + Desktop Controls */}
                        <div className="hidden items-center gap-2 sm:flex">
                            <button
                                type="button"
                                aria-label="Previous products"
                                onClick={() => handleScroll("prev")}
                                className="flex h-6 w-9 items-center justify-center rounded-lg
                                    border border-slate-200 bg-white text-slate-600
                                    transition hover:border-orange-500
                                    hover:bg-orange-50 hover:text-orange-500"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </button>
    
                            <button
                                type="button"
                                aria-label="Next products"
                                onClick={() => handleScroll("next")}
                                className="flex h-6 w-9 items-center justify-center rounded-lg
                                    border border-slate-200 bg-white text-slate-600
                                    transition hover:border-orange-500
                                    hover:bg-orange-50 hover:text-orange-500"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
    
                        {/* View All */}
                        <Link
                            to={`/products/${type}`}
                            className="text-sm font-medium text-orange-500 transition hover:text-orange-600"
                        >
                            View all
                        </Link>
                    </div>
                </div>
    
                {/* Cards */}
                <div
                    ref={sliderRef}
                    className="
                        grid grid-cols-2 gap-3
    
                        sm:flex sm:gap-4 sm:overflow-x-auto
                        sm:scroll-smooth
    
                        lg:gap-5
    
                        [&::-webkit-scrollbar]:hidden
                        [-ms-overflow-style:none]
                        [scrollbar-width:none]
                    "
                >
                    {/* Mobile: 2 columns */}
                    {/* Tablet: 3 cards */}
                    {/* Desktop: 5 cards */}
    
                    {/* <div
                        className="
                            min-w-0
                            sm:min-w-[calc((100%-2rem)/3)]
                            sm:w-[calc((100%-2rem)/3)]
                            lg:min-w-[calc((100%-5rem)/5)]
                            lg:w-[calc((100%-5rem)/5)]
                        "
                    >
                        <ProductCard />
                    </div> */}


                    {
                        products.map(({ _id, name, discount, price, images }) => (
                            <div
                                key={_id}
                                className="
                                    min-w-0
                                    sm:min-w-[calc((100%-2rem)/3)]
                                    sm:w-[calc((100%-2rem)/3)]
                                    lg:min-w-[calc((100%-5rem)/5)]
                                    lg:w-[calc((100%-5rem)/5)]
                                    "
                            >
                                <ProductCard
                                    // key={_id}
                                    _id={_id}
                                    name={name}
                                    discount={discount}
                                    price={price}
                                    images={images}
                                />
                            </div>
                        ))
                    }
                    
                </div>
            </section>
        </>
    )
}



export default HorizontalProductSlider