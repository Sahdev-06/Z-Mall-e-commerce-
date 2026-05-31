import { Router } from "express"
import { createProduct, deleteProduct, updateProduct } from "../controllers/product.controller.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()

router.route("/create").post(verifyJWT, verifyAdmin, upload.array("images"), createProduct)
router.route("/update/:id").patch(verifyJWT, verifyAdmin, upload.array("images"), updateProduct)
router.route("/delete/:id").delete(verifyJWT, verifyAdmin, deleteProduct)



export default router;