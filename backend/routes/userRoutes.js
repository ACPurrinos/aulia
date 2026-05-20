import express from 'express';
const router = express.Router();
import userController from '../controllers/userController.js';

router.get('/findUsers', userController.listUsers);
router.get('/findUser/:id', userController.findUserById);
router.post('/saveUser/', userController.saveUser);
router.put('/updateUser/:id', userController.updateUser);
router.delete('/deleteUser/:id', userController.deleteUser);

export default router;