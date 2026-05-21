import express from 'express';
const router = express.Router();
import checkInController from '../controllers/checkInController.js';

router.get('/summary', checkInController.getSummary);
router.get('/helperRequest', checkInController.getHelperRequest);
router.post('/savecheckIn/', checkInController.saveCheckIn);

export default router;