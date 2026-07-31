import ProductCard from "./ProductCard"

function HorizontalProductSlider({ products }) {
    return (
        <>
            <div className="flex gap-3 overflow-x-auto">
                {
                    products.map(({ _id, name, discount, price, images }) => (
                        <div
                            key={_id}
                            className="w-64 flex-shrink-0"
                        >
                            <ProductCard
                                // key={_id}
                                name={name}
                                discount={discount}
                                price={price}
                                images={images}
                            />
                        </div>
                    ))
                }
            </div>
        </>
    )
}



export default HorizontalProductSlider