import { Router } from 'express';
import {
    createCategory,
    deleteCategory,
    getAllCategories,
    getCategoryById,
    updateCategory
} from '../controllers/category.controller.js';

import { verifyAdmin } from '../middlewares/admin.middleware.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = Router();

router.route("/create").post(verifyJWT, verifyAdmin, upload.single("image"), createCategory);
router.route("/update/:id").patch(verifyJWT, verifyAdmin, upload.single("image"), updateCategory);
router.route("/delete/:id").delete(verifyJWT, verifyAdmin, deleteCategory)
router.route("/all").get(verifyJWT, verifyAdmin, getAllCategories)
router.route("/get/:id").get(verifyJWT, verifyAdmin, getCategoryById)

export default router;