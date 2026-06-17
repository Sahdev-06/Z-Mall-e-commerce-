import { Router } from "express"
import { 
    createProduct, 
    deleteProduct, 
    getAllProduct, 
    getProductById, 
    updateProduct 
} from "../controllers/product.controller.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()

router.route("/create").post(verifyJWT, verifyAdmin, upload.array("images"), createProduct)
router.route("/update/:id").patch(verifyJWT, verifyAdmin, upload.array("images"), updateProduct)
router.route("/delete/:id").delete(verifyJWT, verifyAdmin, deleteProduct)
router.route("/get-all-product").get(getAllProduct)
router.route("/get-product/:id").get(getProductById)



export default router;