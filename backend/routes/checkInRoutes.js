import express from 'express';
const router = express.Router();
import checkInController from '../controllers/checkInController.js';
import validateRequest from '../middlewares/validateRequest.js';
import { createCheckInSchema } from '../validators/checkInValidator.js';

router.get('/summary', checkInController.getSummary);
router.get('/helperRequest', checkInController.getHelperRequest);
router.post('/saveCheckIn/', validateRequest(createCheckInSchema), checkInController.saveCheckIn);

export default router;