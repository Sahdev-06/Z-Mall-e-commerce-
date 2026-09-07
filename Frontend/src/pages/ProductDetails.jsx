import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getProductById, getProductRecommendations  } from "../services/productService"
import Breadcrumb from "../components/Common/Breadcrumb"
import ProductImage from "../components/Product/ProductImage"
import ProductInfo from "../components/Product/ProductInfo"
import HorizontalProductSlider from "../components/Product/HorizontalProductSlider"
import Loading from "../components/Common/Loading"
import ErrorState from "../components/Common/ErrorState"

function ProductDetails() {
    const [product, setProduct] = useState({})
    const [similarProducts, setSimilarProducts] = useState([])
    const [recommendedProducts, setRecommendedProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const { id } = useParams();

    useEffect(() => {

        const fetchProduct = async () => {
            try {
                const result = await getProductById(id)
                setProduct(result.data)
            } catch (error) {
                setError("Failed to load product details")
            } finally {
                setLoading(false)
            }
        }
        fetchProduct();
    }, [id])

    // fetching similar products

    useEffect(() => {
        const fetchRecommendationProducts = async () => {
            try {
                const result = await getProductRecommendations (id)
                setSimilarProducts(result.data.similarProducts)
                setRecommendedProducts(result.data.recommendedProducts)
            } catch (error) {
                console.log(error)
            }
        }

        fetchRecommendationProducts()
    }, [id])

    if(loading) {
        return <Loading />
    }

    if(error) {
        return <ErrorState message={error}/>
    }

    return (
        <>
            <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
                <Breadcrumb />
                <div className="flex flex-col gap-10 md:grid md:grid-cols-2 md:gap-12 py-4 sm:py-6 lg:py-0">
                    <ProductImage images={product.images}/>
                    <ProductInfo product={product}/>
                </div>

                <hr className="text-gray-200 mt-10"/>

                {/* Similar Products */}
                <div className="mt-10">
                    {similarProducts.length > 0 && (
                        <HorizontalProductSlider
                            products={similarProducts}
                            title={"Similar Products"} 
                            showBtn={false}
                            showView={false}
                        />
                    )}
                </div>

                {/* recommended products */}
                <div className="mt-10">
                    {recommendedProducts.length > 0 && (
                        <HorizontalProductSlider
                            products={recommendedProducts}
                            title={"You might also like"} 
                            showBtn={false}
                            showView={false}
                        />
                    )}
                </div>
            </div>
        </>
    )
}


export default ProductDetails