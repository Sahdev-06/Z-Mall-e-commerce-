import { Router } from 'express'
import { 
    createPayment, 
    getPaymentByOrderId, 
    updatePaymentStatus
} from '../controllers/payment.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'

const router = Router()

router.route("/").post(verifyJWT, createPayment)
router.route("/order/:orderId").get(verifyJWT, getPaymentByOrderId)
router.route("/:id/status").patch(verifyJWT, updatePaymentStatus)


export default router