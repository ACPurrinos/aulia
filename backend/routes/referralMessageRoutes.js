import { Router } from 'express';
import ReferralMessageController from '../controllers/ReferralMessageController.js';
import validateRequest from '../middlewares/validateRequest.js';
import { createReferralMessageSchema } from '../validators/referralMessageValidator.js';
import { verifyToken, authorize } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/:id/messages', verifyToken, authorize("Admin", "Gabinete"), validateRequest(createReferralMessageSchema), ReferralMessageController.sendMessage);
router.get('/:id/messages', verifyToken, authorize("Admin", "Gabinete"), ReferralMessageController.getMessages);
router.delete('/messages/:id', verifyToken, authorize("Admin", "Gabinete"), ReferralMessageController.deleteMessage);

export default router;