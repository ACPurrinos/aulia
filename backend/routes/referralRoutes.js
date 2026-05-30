import express from 'express';
import ReferralController from '../controllers/referralController.js';
import validateRequest from '../middlewares/validateRequest.js';
import { createReferralSchema, updateReferralSchema } from '../validators/referralValidator.js';
import { verifyToken, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', verifyToken, authorize("Admin", "Gabinete", "Docente"), validateRequest(createReferralSchema), ReferralController.create);

router.get('/', verifyToken, authorize("Admin", "Gabinete"), ReferralController.getAll);
router.get('/:id', verifyToken, authorize("Admin", "Gabinete", "Docente"), ReferralController.getById);

router.patch('/:id/accept', verifyToken, authorize("Admin", "Gabinete"), validateRequest(updateReferralSchema), ReferralController.accept);
router.patch('/:id/reject', verifyToken, authorize("Admin", "Gabinete"), validateRequest(updateReferralSchema), ReferralController.reject);
router.patch('/:id/request-info', verifyToken, authorize("Admin", "Gabinete", "Docente"), validateRequest(updateReferralSchema), ReferralController.requestMoreInfo);

export default router;