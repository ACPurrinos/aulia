import express from 'express';
import ReferralHistoryController from '../controllers/ReferralHistoryController.js';
import validateRequest from '../middlewares/validateRequest.js';
import { createReferralHistorySchema } from '../validators/referralHistoryValidator.js';
import { verifyToken, authorize } from '../middlewares/authMiddleware.js';


const router = express.Router();

// crear evento en historial
router.post('/', verifyToken, authorize("Admin", "Gabinete"), validateRequest(createReferralHistorySchema), ReferralHistoryController.create);

// obtener historial por referral
router.get('/referral/:referralId', verifyToken, authorize("Admin", "Gabinete", "Docente"), ReferralHistoryController.getByReferral);

// obtener por id
//router.get('/:id', verifyToken, ReferralHistoryController.getById);

export default router;