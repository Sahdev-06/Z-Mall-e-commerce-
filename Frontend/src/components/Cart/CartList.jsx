import CartItem from "./CartItem"

function CartList({ carts, removeItem }) {

    return (
        <>
            <section className="w-full">
                <div className="divide-y divide-neutral-200">
                    {
                        carts.map(({ product, quantity }) => (
                            <CartItem
                                key={product._id}
                                _id={product._id}
                                removeItem={removeItem}
                                image={product.images[0]}
                                name={product.name}
                                price={product.price}
                                qty={quantity} 
                            />
                        ))
                    }
                </div>
            </section>
        </>
    )
}


export default CartList