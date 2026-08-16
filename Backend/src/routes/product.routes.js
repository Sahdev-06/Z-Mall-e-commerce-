import { Router } from "express"
import { 
    createProduct, 
    deleteProduct, 
    getAllProduct, 
    getAllProductForAdmin, 
    getFeaturedProducts, 
    getNewArrivalProducts, 
    getProductById, 
    getProductByIdForAdmin, 
    getProducts, 
    getTopDealsProducts, 
    toggleFeaturedProduct, 
    updateProduct, 
    updateProductStock
} from "../controllers/product.controller.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()

// admin routes
router.route("/create").post(verifyJWT, verifyAdmin, upload.array("images"), createProduct)
router.route("/update/:id").patch(verifyJWT, verifyAdmin, upload.array("images"), updateProduct)
router.route("/:id/stock").patch(verifyJWT, verifyAdmin, updateProductStock)
router.route("/delete/:id").delete(verifyJWT, verifyAdmin, deleteProduct)
router.route("/all").get(verifyJWT, verifyAdmin, getAllProductForAdmin)
router.route("/get/:id").get(verifyJWT, verifyAdmin, getProductByIdForAdmin)
router.route("/:id/featured").patch(verifyJWT, verifyAdmin, toggleFeaturedProduct)

// public routes
router.route("/get-all-product").get(getAllProduct)
router.route("/get-products").get(getProducts)
router.route("/get-product/:id").get(getProductById)
router.route("/featured").get(getFeaturedProducts)
router.route("/top-deals").get(getTopDealsProducts)
router.route("/new-arrivals").get(getNewArrivalProducts)



export default router;