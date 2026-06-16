import { Router } from 'express';
import {
    createCategory,
    updateCategory
} from '../controllers/category.controller.js';

import { verifyAdmin } from '../middlewares/admin.middleware.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = Router();

router.route("/create").post(verifyJWT, verifyAdmin, upload.single("image"), createCategory);
router.route("/update/:id").patch(verifyJWT, verifyAdmin, upload.single("image"), updateCategory);

export default router;