import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))

app.use(express.json({ limit : "16kb"}))
app.use(express.urlencoded({ extended : true, limit : "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


// routes import
import userRouter from "./routes/user.routes.js"
import productRouter from "./routes/product.routes.js"
import categoryRouter from "./routes/category.routes.js"
import subCategoryRouter from "./routes/subCategory.routes.js"
import addressRouter from "./routes/address.routes.js"
import cartRouter from "./routes/cart.routes.js"
import orderRouter from "./routes/order.routes.js"
import paymentRouter from "./routes/payment.routes.js"
import inventoryRouter from "./routes/inventoryLog.routes.js"
import reviewRouter from "./routes/review.routes.js"
import couponRouter from "./routes/coupon.routes.js"
import bannerRouter from "./routes/banner.routes.js"


// routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/product", productRouter)
app.use("/api/v1/category", categoryRouter)
app.use("/api/v1/subCategory", subCategoryRouter)
app.use("/api/v1/addresses", addressRouter)
app.use("/api/v1/cart", cartRouter)
app.use("/api/v1/order", orderRouter)
app.use("/api/v1/payments", paymentRouter)
app.use("/api/v1/inventory", inventoryRouter)
app.use("/api/v1/reviews", reviewRouter)
app.use("/api/v1/coupon", couponRouter)
app.use("/api/v1/banner", bannerRouter)

export { app }