import express from 'express';
import InterventionController from '../controllers/interventionController.js';
import validateRequest from '../middlewares/validateRequest.js';
import { createInterventionSchema } from '../validators/interventionValidator.js';


const router = express.Router();

router.post('/', validateRequest(createInterventionSchema), InterventionController.create);

router.get('/:id', InterventionController.getById);

router.get('/casefile/:caseFileId', InterventionController.getByCaseFile);

router.get('/professional/me', InterventionController.getByProfessional);

router.get('/student/:studentId', InterventionController.getByStudent);

export default router;