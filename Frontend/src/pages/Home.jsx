import { useState, useEffect } from "react"
import { toast } from "react-hot-toast"
import { getAllCategoriesForPublic } from "../services/categoryService.js"
import { 
    getFeaturedProducts,
    getTopDealsProducts, 
    getNewArrivalProducts 
} from "../services/productService.js"
import { getActiveBanners } from "../services/bannerService.js"
import HeroBanner from "../components/Banner/HeroBanner"
import Loading from "../components/Common/Loading.jsx"
import ErrorState from "../components/Common/ErrorState.jsx"
import EmptyState from "../components/Common/EmptyState.jsx"
import HorizontalProductSlider from "../components/Product/HorizontalProductSlider.jsx"
import CategoryCardSlider from "../components/Category/CategoryCardSlider.jsx"


function Home() {
    const [categories, setCategories] = useState([])
    const [featuredProducts, setFeaturedProducts] = useState([])
    const [topDealsProducts, setTopDealsProducts] = useState([])
    const [newArrivalProducts, setNewArrivalProducts] = useState([])
    const [banners, setBanners] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")


    // fetch all categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const result = await getAllCategoriesForPublic()
                setCategories(result.data)
            } catch (error) {
                setError("Failed to load categories")
            }
        }

        fetchCategories();
    }, [])

    // fetch products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const featured = await getFeaturedProducts(1, 10)
                setFeaturedProducts(featured.data.products)

                const topDeals = await getTopDealsProducts(1, 10)
                setTopDealsProducts(topDeals.data.products)

                const newArrival = await getNewArrivalProducts(1, 10)
                setNewArrivalProducts(newArrival.data.products)
            } catch (error) {
                console.error(error)

                toast.error(
                    error.response?.data?.message ||
                    "Something went wront. Please try again"
                )
            }
        }

        fetchProducts()
    }, [])

    // fetch banners
    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const result = await getActiveBanners()
                setBanners(result.data)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        fetchBanners()
    }, [])

    if(loading) {
        return <Loading />
    }

    return(
        <>
            <main className="space-y-12 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
                <HeroBanner 
                    slides={banners}
                />

                <CategoryCardSlider
                    title={"Shop by Category"}
                    categories={categories}
                />

                <HorizontalProductSlider 
                    products={featuredProducts}
                    title={"Featured Products"}
                    type={"featured"}
                />

                <HorizontalProductSlider 
                    products={topDealsProducts}
                    title={"Top Deals"}
                    type={"top-deals"}
                />

                <HorizontalProductSlider 
                    products={newArrivalProducts}
                    title={"New Arrivals"}
                    type={"new-arrivals"}
                />
            </main>
        </>
    )
}


export default Home