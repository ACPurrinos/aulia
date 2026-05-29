import express from 'express';
import CaseFileController from '../controllers/CaseFileController.js';
import validateRequest from '../middlewares/validateRequest.js';
import { createCaseFileSchema } from '../validators/caseFileValidator.js';

const router = express.Router();

// crear legajo
router.post('/', validateRequest(createCaseFileSchema), CaseFileController.create);

// obtener o crear por student
router.get('/student/:studentId', CaseFileController.getById);

// cerrar legajo
router.patch('/:id/close', CaseFileController.close);

// reabrir legajo
router.patch('/:id/reopen', CaseFileController.reopen);

router.get('/:id', CaseFileController.getCaseFileById);

export default router;