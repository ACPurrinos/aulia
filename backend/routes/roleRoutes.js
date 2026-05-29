import express from 'express';
const router = express.Router();
import roleController from '../controllers/roleController.js';
import { verifyToken, authorize } from '../middlewares/authMiddleware.js';


router.get('/findAllRoles', verifyToken, authorize("Admin"), roleController.getAllRoles);
router.get('/findRole/:id', verifyToken, authorize("Admin"), roleController.findRoleById);

export default router;