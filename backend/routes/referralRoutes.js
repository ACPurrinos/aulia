import express from 'express';
import referralController from '../controllers/referralController.js';
import validateRequest from '../middlewares/validateRequest.js';
import { createReferralSchema, updateReferralSchema } from '../validators/referralValidator.js';
import { verifyToken, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', verifyToken, authorize("Admin", "Gabinete", "Docente"), validateRequest(createReferralSchema), referralController.create);

router.get('/', verifyToken, authorize("Admin", "Gabinete"), referralController.getAll);
router.get('/byTeacher/:id', verifyToken, authorize("Admin", "Gabinete"), referralController.getAllByTeacher);
router.get('/:id', verifyToken, authorize("Admin", "Gabinete", "Docente"), referralController.getById);

router.patch('/:id/accept', verifyToken, authorize("Admin", "Gabinete"), validateRequest(updateReferralSchema), referralController.accept);
router.patch('/:id/reject', verifyToken, authorize("Admin", "Gabinete"), validateRequest(updateReferralSchema), referralController.reject);
router.patch('/:id/request-info', verifyToken, authorize("Admin", "Gabinete", "Docente"), validateRequest(updateReferralSchema), referralController.requestMoreInfo);

export default router;