import SectionHeading from "../Common/SectionHeading"
import ProductGrid from "./ProductGrid"
import HorizontalProductSlider from "./HorizontalProductSlider"

function ProductSection({ title, products, showViewAll, isSlider, type, isShow }) {
    return (
        <>
            <div>
                <SectionHeading title={title} showViewAll={showViewAll} type={type}/>
                {
                    isSlider ? (
                        <HorizontalProductSlider products={products}/>
                    ) : (
                        // <ProductGrid products={products} />
                        ""
                    )
                }
            </div>
        </>
    )
}


export default ProductSection