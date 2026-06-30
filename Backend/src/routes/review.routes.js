import { Router } from 'express'
import { 
    createReview, 
    deleteReview, 
    getProductReviews, 
    updateReview 
} from '../controllers/review.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'


const router = Router()

router.route("/").post(verifyJWT, createReview)
router.route("/:id").patch(verifyJWT, updateReview)
router.route("/:id").delete(verifyJWT, deleteReview)
router.route("/product/:productId").get(getProductReviews)


export default router