import Breadcrumb from "../components/Common/Breadcrumb"
import FilterSidebar from "../components/Product/FilterSidebar"
import ProductGrid from "../components/Product/ProductGrid"
import ListingHeader from "../components/Product/ListingHeader"
import { products } from "../Dummy/dummyData"

function ProductListing() {
    return (
        <>
            <div className="space-y-8">
                <Breadcrumb />
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <FilterSidebar />
                    <div className="col-span-3 space-y-6">
                        <ListingHeader />
                        <ProductGrid products={products}/>
                    </div>
                </div>
            </div>
        </>
    )
}


export default ProductListing