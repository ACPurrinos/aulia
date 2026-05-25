import express from 'express';
import ReferralHistoryController from '../controllers/ReferralHistoryController.js';

const router = express.Router();

// crear evento en historial
router.post('/', ReferralHistoryController.create);

// obtener historial por referral
router.get('/referral/:referralId', ReferralHistoryController.getByReferral);

// obtener por id
router.get('/:id', ReferralHistoryController.getById);

export default router;