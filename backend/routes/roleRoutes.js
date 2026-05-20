import express from 'express';
const router = express.Router();
import roleController from '../controllers/roleController.js';

router.get('/findAllRoles',  roleController.getAllRoles);
router.get('/findRole/:id', roleController.findRoleById);

export default router;