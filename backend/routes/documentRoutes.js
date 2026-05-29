import express from 'express';
import DocumentController from '../controllers/documentController.js';
import validateRequest from '../middlewares/validateRequest.js';
import { createDocumentSchema, updateDocumentSchema } from '../validators/documentValidator.js';
import { verifyToken, authorize } from '../middlewares/authMiddleware.js';


const router = express.Router();

// crear documento
router.post('/', verifyToken, authorize("Admin", "Gabinete"), validateRequest(createDocumentSchema), DocumentController.create);

// obtener por id
router.get('/:id', verifyToken, authorize("Admin", "Gabinete"), DocumentController.getById);

// por caseFile
router.get('/casefile/:caseFileId', verifyToken, authorize("Admin", "Gabinete"), DocumentController.getByCaseFile);

// por intervention
router.get('/intervention/:interventionId', verifyToken, authorize("Admin", "Gabinete"), DocumentController.getByIntervention);

// actualizar metadata
router.patch('/:id', verifyToken, authorize("Admin", "Gabinete"), validateRequest(updateDocumentSchema), DocumentController.update);

// eliminar (soft delete)
router.delete('/:id', verifyToken, authorize("Admin", "Gabinete"), DocumentController.delete);

export default router;