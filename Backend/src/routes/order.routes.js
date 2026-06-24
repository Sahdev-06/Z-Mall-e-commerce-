import { Router } from 'express';
import { 
    cancelOrder, 
    createOrder, 
    getAllOrders, 
    getMyOrders, 
    getOrderById, 
    getOrderByIdForAdmin, 
    updateOrderStatus
} from '../controllers/order.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { verifyAdmin } from '../middlewares/admin.middleware.js';


const router = Router();


router.route("/create").post(verifyJWT, createOrder);
router.route("/get").get(verifyJWT, getMyOrders);
router.route("/get/:id").get(verifyJWT, getOrderById);
router.route("/cancel/:id").get(verifyJWT, cancelOrder);
router.route("/get-all").get(verifyJWT, verifyAdmin, getAllOrders);
router.route("/:id/status").patch(verifyJWT, verifyAdmin, updateOrderStatus);
router.route("/admin/:id").get(verifyJWT, verifyAdmin, getOrderByIdForAdmin);


export default router