import express from 'express';
import DocumentController from '../controllers/documentController.js';
import validateRequest from '../middlewares/validateRequest.js';
import { createDocumentSchema, updateDocumentSchema } from '../validators/documentValidator.js';


const router = express.Router();

// crear documento
router.post('/', validateRequest(createDocumentSchema), DocumentController.create);

// obtener por id
router.get('/:id', DocumentController.getById);

// por caseFile
router.get('/casefile/:caseFileId', DocumentController.getByCaseFile);

// por intervention
router.get('/intervention/:interventionId', DocumentController.getByIntervention);

// actualizar metadata
router.patch('/:id', validateRequest(updateDocumentSchema), DocumentController.update);

// eliminar (soft delete)
router.delete('/:id', DocumentController.delete);

export default router;