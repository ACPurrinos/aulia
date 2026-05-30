import express from 'express';
const router = express.Router();
import authController from '../controllers/authController.js';
import validateRequest from '../middlewares/validateRequest.js';
import { loginSchema } from '../validators/loginValidator.js';

router.post('/', validateRequest(loginSchema), authController.login);

export default router;