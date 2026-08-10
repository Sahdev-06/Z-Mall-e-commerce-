

function ItemCard({ productImage, productName, price, quantity }) {
    return (
        <div className="flex items-center gap-5 bg-white p-2 rounded-sm">
            <div className="bg-gray-100 w-20 h-20 flex items-center justify-center">
                <img 
                    src={productImage}
                    className="h-full w-full object-contain"
                />
            </div>
            <div>
                <p className="text-slate-900">
                    {productName}
                </p>
                <div className="flex gap-5">
                    <p className="text-xl text-slate-900">
                        ₹{price.toLocaleString("en-IN")}
                    </p>
                    <p className="text-slate-900">
                        Qty: {quantity}
                    </p>
                </div>
            </div>
        </div>
    )
}


export default ItemCard