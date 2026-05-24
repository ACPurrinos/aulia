import express from 'express';
import ReferralController from '../controllers/referralController.js';

const router = express.Router();

router.post('/', ReferralController.create);

router.get('/', ReferralController.getAll);
router.get('/:id', ReferralController.getById);

router.patch('/:id/accept', ReferralController.accept);
router.patch('/:id/reject', ReferralController.reject);
router.patch('/:id/request-info', ReferralController.requestMoreInfo);

export default router;