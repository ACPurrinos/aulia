import { Router } from 'express';
import ReferralMessageController from '../controllers/ReferralMessageController.js';

const router = Router();

router.post('/:id/messages', ReferralMessageController.sendMessage);
router.get('/:id/messages', ReferralMessageController.getMessages);
router.delete('/messages/:id', ReferralMessageController.deleteMessage);

export default router;