import Router from "express";
import {
    createSubCategory,
    updateSubCategory,
    deleteSubCategory,
    getAllSubCategories,
    getSubCategoryById
} from "../controllers/subCategory.controller.js";

import { verifyAdmin } from "../middlewares/admin.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router();

router.route("/create").post(verifyJWT, verifyAdmin, createSubCategory);
router.route("/update/:id").patch(verifyJWT, verifyAdmin, updateSubCategory);
router.route("/delete/:id").delete(verifyJWT, verifyAdmin, deleteSubCategory);
router.route("/all").get(getAllSubCategories);
router.route("/get/:id").get(verifyJWT, verifyAdmin, getSubCategoryById);


export default router;