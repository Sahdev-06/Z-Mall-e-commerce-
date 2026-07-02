import { Router } from 'express'
import { 
    createCoupon,
    updateCoupon,
    deleteCoupon,
    getAllCoupons,
    applyCoupon
} from '../controllers/coupon.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'
import { verifyAdmin } from '../middlewares/admin.middleware.js'

const router = Router()

router.route("/create").post(verifyJWT, verifyAdmin, createCoupon)
router.route("/update/:id").patch(verifyJWT, verifyAdmin, updateCoupon)
router.route("/delete/:id").delete(verifyJWT, verifyAdmin, deleteCoupon)
router.route("/all").get(verifyJWT, verifyAdmin, getAllCoupons)
router.route("/apply").post(verifyJWT, applyCoupon)


export default router