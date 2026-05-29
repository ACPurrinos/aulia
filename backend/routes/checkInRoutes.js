import express from 'express';
const router = express.Router();
import checkInController from '../controllers/checkInController.js';
import validateRequest from '../middlewares/validateRequest.js';
import { createCheckInSchema } from '../validators/checkInValidator.js';
import { verifyToken, authorize } from '../middlewares/authMiddleware.js';

router.get('/helperRequest', verifyToken, authorize("Admin", "Gabinete"), checkInController.getHelperRequest);
router.get('/summary', verifyToken, authorize("Admin", "Gabinete"), checkInController.getSummary);
router.get('/helperRequest', verifyToken, authorize("Admin", "Gabinete"), checkInController.getHelperRequest);
router.post('/saveCheckIn', verifyToken, authorize("Admin", "Alumno"), validateRequest(createCheckInSchema), checkInController.saveCheckIn);

export default router;