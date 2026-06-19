import { Router } from 'express';
import {
    createAddress,
    updateAddress,
    deleteAddress,
    getAllAddresses,
    getAddressById,
    setDefaultAddress
} from '../controllers/address.controller.js';

import { verifyJWT } from '../middlewares/auth.middleware.js';


const router = Router();

router.route("/create").post(verifyJWT, createAddress);
router.route("/update/:id").patch(verifyJWT, updateAddress);
router.route("/delete/:id").delete(verifyJWT, deleteAddress);
router.route("/all").get(verifyJWT, getAllAddresses);
router.route("/:id").get(verifyJWT, getAddressById);
router.route("/set-default/:id").patch(verifyJWT, setDefaultAddress);


export default router;