import ProductCard from "./ProductCard"

function ProductGrid({ products, isShow }) {
    return (
        <div className="mx-auto w-full max-w-8xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4
                            gap-x-3 gap-y-8 sm:gap-x-4 sm:gap-y-10 md:gap-5 lg:gap-6"
            >
                {
                    products.map(({ _id, name, discount, price, images }) => (
                        <ProductCard
                            key={_id}
                            _id={_id}
                            name={name}
                            discount={discount}
                            price={price}
                            images={images}
                        />
                    ))
                }
            </div>
        </div>
    )
}


export default ProductGrid




{/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {
        products.map(({ _id, name, discount, price, images }) => (
            <ProductCard
                key={_id}
                _id={_id}
                name={name}
                discount={discount}
                price={price}
                images={images}
            />
        ))
    }
</div> */}