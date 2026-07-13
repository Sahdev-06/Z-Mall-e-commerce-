import SectionHeading from "../Common/SectionHeading"
import ProductGrid from "./ProductGrid"

function ProductSection({ title, products}) {
    return (
        <>
            <div>
                <SectionHeading title={title}/>
                <ProductGrid products={products}/>
            </div>
        </>
    )
}


export default ProductSection