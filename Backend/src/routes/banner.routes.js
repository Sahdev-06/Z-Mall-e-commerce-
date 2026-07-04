import { Router } from 'express'
import { 
    createBanner,
    updateBanner,
    deleteBanner,
    getAllBanners,
    getActiveBanners 
} from '../controllers/banner.controller.js'
import { verifyAdmin } from '../middlewares/admin.middleware.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';



const router = Router()


router.route("/create").post(verifyJWT, verifyAdmin, upload.single("image"), createBanner);
router.route("/update/:id").patch(verifyJWT, verifyAdmin, upload.single("image"), updateBanner);
router.route("/delete/:id").delete(verifyJWT, verifyAdmin, deleteBanner);
router.route("/all").get(verifyJWT, verifyAdmin, getAllBanners);
router.route("/active").get(getActiveBanners);


export default router