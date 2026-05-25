import express from 'express';
const router = express.Router();
import userController from '../controllers/userController.js';
import validateRequest from '../middlewares/validateRequest.js';
import { createUserSchema, updateUserSchema } from '../validators/userValidator.js';

router.get('/findUsers', userController.listUsers);
router.get('/activeUsers', userController.listActiveUsers);
router.get('/findUser/:id', userController.findUserById);
router.post('/saveUser/', validateRequest(createUserSchema), userController.saveUser);
router.put('/updateUser/:id', validateRequest(updateUserSchema), userController.updateUser);
router.delete('/deleteUser/:id', userController.deleteUser);

export default router;