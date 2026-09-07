import { useParams, useSearchParams } from "react-router-dom"
import { useState, useEffect, use } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"
import {
    getFeaturedProducts,
    getTopDealsProducts,
    getNewArrivalProducts,
    getProducts,
    getProductsByCategory
} from "../services/productService"
import { getAllCategoriesForPublic } from "../services/categoryService"
import Breadcrumb from "../components/Common/Breadcrumb"
import FilterSidebar from "../components/Product/FilterSidebar"
import ProductGrid from "../components/Product/ProductGrid"
import ListingHeader from "../components/Product/ListingHeader"
import Loading from "../components/Common/Loading"
import ErrorState from "../components/Common/ErrorState"
import NoProducts from "../components/Common/NoProducts"
import UserPagination from "../components/Common/UserPagination"
import FilterDrawer from "../components/Product/FilterDrawer"

function ProductListing() {
    const navigate = useNavigate();

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])
    const [sort, setSort] = useState("")
    const [page, setPage] = useState(1)
    const [pagination, setPagination] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const { type } = useParams();

    // destructuring the searchParams from userSearchParams array
    const [searchParams, setSearchParams] = useSearchParams();

    const search = searchParams.get("q")
    // const categoryId = searchParams.get("category")
    const categoryParam = searchParams.get("category");

    const categoriesFromUrl = categoryParam
        ? categoryParam.split(",")
        : [];

    // fetch products
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true)

            try {
                if (type === "featured") {
                    const result = await getFeaturedProducts(page, 10, sort)
                    setProducts(result.data.products)
                    setPagination(result.data.pagination)
                } else if (type === "top-deals") {
                    const result = await getTopDealsProducts(page, 20, sort)
                    setProducts(result.data.products)
                    setPagination(result.data.pagination)
                } else if (type === "new-arrivals") {
                    const result = await getNewArrivalProducts(page, 20, sort)
                    setProducts(result.data.products)
                    setPagination(result.data.pagination)
                // } else if (categoryId) {
                //     const result = await getProductsByCategory(page, 20, categoryId)
                //     setProducts(result.data.products)
                //     setPagination(result.data.pagination)
                } else {
                    // const result = await getProducts(search, selectedCategories, sort, page, 20)
                    // setProducts(result.data.products)
                    // setPagination(result.data.pagination)

                    const categoriesToFetch =
                        categoriesFromUrl.length > 0
                            ? categoriesFromUrl
                            : selectedCategories;

                    const result = await getProducts(
                        search,
                        categoriesToFetch,
                        sort,
                        page,
                        20
                    );

                    setProducts(result.data.products);
                    setPagination(result.data.pagination);
                }
            } catch (error) {
                console.error(error)
                setError("Failed to load data")

                // toast.error(
                //     error.response?.data?.message ||
                //     "Oops! Failed to load data"
                // )

            } finally {
                setLoading(false)
            }
        }

        fetchProducts();
    }, [type, search, selectedCategories, sort, page, categoryParam])


    // fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const result = await getAllCategoriesForPublic();
                setCategories(result.data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchCategories();
    }, [])

    // update URL for cateogry, price sorting and page
    useEffect(() => {
        const params = new URLSearchParams(searchParams);

        // category
        if (selectedCategories.length > 0) {
            params.set("category", selectedCategories.join(","));
        } else {
            params.delete("category");
        }

        // sort
        if (sort) {
            params.set("sort", sort);
        } else {
            params.delete("sort");
        }

        // page
        if (page > 1) {
            params.set("page", page);
        } else {
            params.delete("page");
        }

        if (
            selectedCategories.length > 0 &&
            (
                type === "featured" ||
                type === "top-deals" ||
                type === "new-arrivals"
            )
        ) {
            navigate(`/products?${params.toString()}`);
        } else {
            setSearchParams(params);
        }

    }, [selectedCategories, sort, page]);

    // keep the filters same after refresh
    useEffect(() => {
        const categoryParam = searchParams.get("category")

        if (categoryParam) {
            setSelectedCategories(categoryParam.split(","))
        } else {
            setSelectedCategories([])
        }
    }, [searchParams])


    // keep the sorting price after refresh
    useEffect(() => {
        const sortParam = searchParams.get("sort")

        if (sortParam) {
            setSort(sortParam)
        }
    }, [searchParams])

    // keep page same when refresh
    useEffect(() => {
        const pageParam = searchParams.get("page")

        if (pageParam) {
            setPage(Number(pageParam))
        }

    }, [searchParams])

    if (loading) {
        return <Loading />
    }

    if (error) {
        return <ErrorState message={error} />
    }


    return (
        <>
            <Breadcrumb />

            <div className="flex items-start gap-6 lg:gap-8">
                {/* Desktop sidebar */}
                <FilterSidebar
                    categories={categories}
                    selectedCategories={selectedCategories}
                    setSelectedCategories={setSelectedCategories}
                    setPage={setPage}
                />

                <main className="min-w-0 flex-1">
                    {/* Header */}
                    <ListingHeader
                        sort={sort}
                        setSort={setSort}
                        setPage={setPage}
                        totalProducts={pagination?.totalProducts}
                        onFilterClick={() => setIsFilterOpen(true)}
                    />
                    
                    <div className="mt-6">
                        {
                            products.length > 0 ? (
                                <ProductGrid products={products} isShow={true}/>
                            ) : (
                                <NoProducts />
                            )
                        }
                    </div>
                    <div className="my-6 border-t border-gray-200" />
                    {/* Pagination */}
                    {
                        products.length > 0 && pagination?.totalPages > 1 && (
                            <UserPagination 
                                currentPage={pagination?.currentPage}
                                totalPage={pagination?.totalPages}
                                setPage={setPage}
                            />
                        )
                    }
                </main>
                
                {/* Mobile / Tablet Filter Drawer */}
                <FilterDrawer
                    isOpen={isFilterOpen}
                    onClose={() => setIsFilterOpen(false)}
                    setIsFilterOpen={setIsFilterOpen}
                    categories={categories}
                    selectedCategories={selectedCategories}
                    setSelectedCategories={setSelectedCategories}
                    setPage={setPage}
                />
            </div>
        </>
    )
}


export default ProductListing