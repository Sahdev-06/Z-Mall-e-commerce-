import { Router } from 'express';
import {
    addToCart,
    getCart,
    removeCartItem,
    updateCartItemQuantity,
    clearCart
} from '../controllers/cart.controller.js'

import { verifyJWT } from '../middlewares/auth.middleware.js';


const router = Router();

router.route("/").post(verifyJWT, addToCart);
router.route("/").get(verifyJWT, getCart);
router.route("/items/:productId").delete(verifyJWT, removeCartItem);
router.route("/items/:productId").patch(verifyJWT, updateCartItemQuantity);
router.route("/").delete(verifyJWT, clearCart);


export default router