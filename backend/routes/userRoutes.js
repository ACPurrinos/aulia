import express from 'express';
const router = express.Router();
import userController from '../controllers/userController.js';
import validateRequest from '../middlewares/validateRequest.js';
import { createUserSchema, updateUserSchema } from '../validators/userValidator.js';
import { verifyToken, authorize } from '../middlewares/authMiddleware.js';
import { ALL_ROLES } from '../enums/userRolesEnum.js';


router.get('/findUsers', verifyToken, authorize("Admin"),  userController.listUsers);
router.get('/activeUsers', verifyToken, authorize("Admin"), userController.listActiveUsers);
router.get('/findUser/:id', verifyToken, authorize(...ALL_ROLES), userController.findUserById);
router.post('/saveUser/', verifyToken, authorize("Admin"), validateRequest(createUserSchema), userController.saveUser);
router.put('/updateUser/:id', verifyToken, authorize("Admin"), validateRequest(updateUserSchema), userController.updateUser);
router.delete('/deleteUser/:id', verifyToken, authorize("Admin"), userController.deleteUser);

export default router;