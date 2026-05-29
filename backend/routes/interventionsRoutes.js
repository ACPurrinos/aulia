import express from 'express';
import InterventionController from '../controllers/interventionController.js';

const router = express.Router();

router.post('/', InterventionController.create);

router.get('/:id', InterventionController.getById);

router.get('/casefile/:caseFileId', InterventionController.getByCaseFile);

router.get('/professional/me', InterventionController.getByProfessional);

router.get('/student/:studentId', InterventionController.getByStudent);

export default router;