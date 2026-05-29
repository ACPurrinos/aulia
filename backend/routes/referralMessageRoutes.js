import { Router } from 'express';
import ReferralMessageController from '../controllers/ReferralMessageController.js';
import validateRequest from '../middlewares/validateRequest.js';
import { createReferralMessageSchema } from '../validators/referralMessageValidator.js';


const router = Router();

router.post('/:id/messages', validateRequest(createReferralMessageSchema), ReferralMessageController.sendMessage);
router.get('/:id/messages', ReferralMessageController.getMessages);
router.delete('/messages/:id', ReferralMessageController.deleteMessage);

export default router;