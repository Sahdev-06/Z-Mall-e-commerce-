import CartItem from "./CartItem"

function CartList({ carts }) {
    return (
        <>
            <div className="flex flex-col gap-6">
                {
                    carts.map(({ image, name, price, qty }) => (
                        <CartItem
                            key={name}
                            image={image}
                            name={name}
                            price={price}
                            qty={qty} 
                        />
                    ))
                }
            </div>
        </>
    )
}


export default CartList