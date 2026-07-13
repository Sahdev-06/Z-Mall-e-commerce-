import ProductCard from "./ProductCard"

function ProductGrid({ products }) {
    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {
                    products.map(({ _id, name, discount, price, image }) => (
                        <ProductCard
                            key={_id}
                            name={name}
                            discount={discount}
                            price={price}
                            image={image}
                        />
                    ))
                }
            </div>
        </>
    )
}


export default ProductGrid