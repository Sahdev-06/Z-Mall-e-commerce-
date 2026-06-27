import { Router } from 'express'
import { getInventoryLogs } from '../controllers/inventoryLog.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'
import { verifyAdmin } from '../middlewares/admin.middleware.js'

const router = Router()

router.route("/:productId").get(verifyJWT, verifyAdmin, getInventoryLogs)


export default router