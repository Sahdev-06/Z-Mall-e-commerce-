import Breadcrumb from "../components/Common/Breadcrumb"
import ProductImage from "../components/Product/ProductImage"
import ProductInfo from "../components/Product/ProductInfo"
import ProductSection from "../components/Product/ProductSection"
import { products } from "../Dummy/dummyData"

function ProductDetails() {
    return (
        <>
            <div className="space-y-6">
                <Breadcrumb />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <ProductImage />
                    <ProductInfo />
                </div>
                <ProductSection title={"Related Products"} products={products}/>
            </div>
        </>
    )
}


export default ProductDetails