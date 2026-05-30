import express from 'express';
import InterventionController from '../controllers/interventionController.js';
import validateRequest from '../middlewares/validateRequest.js';
import { createInterventionSchema } from '../validators/interventionValidator.js';
import { verifyToken, authorize } from '../middlewares/authMiddleware.js';


const router = express.Router();

router.post('/', verifyToken, authorize("Admin", "Gabinete"), validateRequest(createInterventionSchema), InterventionController.create);

router.get('/:id', verifyToken, authorize("Admin", "Gabinete"), InterventionController.getById);

router.get('/casefile/:caseFileId', verifyToken, authorize("Admin", "Gabinete"), InterventionController.getByCaseFile);

router.get('/professional/:id', verifyToken, authorize("Admin", "Gabinete"), InterventionController.getByProfessional);

router.get('/student/:studentId', verifyToken, authorize("Admin", "Gabinete"), InterventionController.getByStudent);

export default router;