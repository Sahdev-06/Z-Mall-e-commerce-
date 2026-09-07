import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import CategoryCard from "./CategoryCard";


function CategoryCardSlider({ title, categories }) {
    const sliderRef = useRef(null);
    const navigate = useNavigate();

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
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold tracking-tight text-slate-900 md:text-2xl">
                        {title}
                    </h2>
    
                    {/* Tablet + Desktop Controls */}
                    <div className="hidden items-center gap-2 sm:flex">
                        <button
                            type="button"
                            aria-label="Previous categories"
                            onClick={() => handleScroll("prev")}
                            className="
                                flex h-7 w-9 items-center justify-center
                                rounded-lg border border-slate-200
                                bg-white text-slate-600
                                transition
                                hover:border-orange-500
                                hover:bg-orange-50
                                hover:text-orange-500
                            "
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </button>
    
                        <button
                            type="button"
                            aria-label="Next categories"
                            onClick={() => handleScroll("next")}
                            className="
                                flex h-7 w-9 items-center justify-center
                                rounded-lg border border-slate-200
                                bg-white text-slate-600
                                transition
                                hover:border-orange-500
                                hover:bg-orange-50
                                hover:text-orange-500
                            "
                        >
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
    
                {/* Slider */}
                <div
                    ref={sliderRef}
                    className="
                        flex
                        gap-3
                        overflow-x-auto
                        scroll-smooth
                        sm:gap-4
                        lg:gap-5
    
                        [&::-webkit-scrollbar]:hidden
                        [-ms-overflow-style:none]
                        [scrollbar-width:none]
    
                        touch-pan-x
                    "
                >
                    {categories.map(({ _id, name, image }) => (
                        <div
                            key={_id}
                            className="
                                min-w-0
                                shrink-0
                                basis-[calc((100%-1.5rem)/3)]
    
                                sm:basis-[calc((100%-3rem)/4)]
    
                                lg:basis-[calc((100%-6.25rem)/6)]
                            "
                        >
                            <CategoryCard
                                image={image}
                                name={name}
                                onClick={() => navigate(`/products?category=${_id}`)}
                            />
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}



export default CategoryCardSlider