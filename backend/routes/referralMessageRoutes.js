import { Router } from 'express';
import referralMessageController from '../controllers/referralMessageController.js';
import validateRequest from '../middlewares/validateRequest.js';
import { createReferralMessageSchema } from '../validators/referralMessageValidator.js';
import { verifyToken, authorize } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/:id/messages', verifyToken, authorize("Admin", "Gabinete"), validateRequest(createReferralMessageSchema), referralMessageController.sendMessage);
router.get('/:id/messages', verifyToken, authorize("Admin", "Gabinete"), referralMessageController.getMessages);
router.delete('/messages/:id', verifyToken, authorize("Admin", "Gabinete"), referralMessageController.deleteMessage);

export default router;