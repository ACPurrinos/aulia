import express from 'express';
import ReferralController from '../controllers/referralController.js';
import validateRequest from '../middlewares/validateRequest.js';
import { createReferralSchema, updateReferralSchema } from '../validators/referralValidator.js';

const router = express.Router();

router.post('/', validateRequest(createReferralSchema), ReferralController.create);

router.get('/', ReferralController.getAll);
router.get('/:id', ReferralController.getById);

router.patch('/:id/accept', validateRequest(updateReferralSchema), ReferralController.accept);
router.patch('/:id/reject', validateRequest(updateReferralSchema), ReferralController.reject);
router.patch('/:id/request-info', validateRequest(updateReferralSchema), ReferralController.requestMoreInfo);

export default router;