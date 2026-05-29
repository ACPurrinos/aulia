import express from 'express';
import CaseFileController from '../controllers/CaseFileController.js';
import validateRequest from '../middlewares/validateRequest.js';
import { createCaseFileSchema } from '../validators/caseFileValidator.js';
import { verifyToken, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

// crear legajo
router.post('/', verifyToken, authorize("Admin", "Gabinete"), validateRequest(createCaseFileSchema), CaseFileController.create);

// obtener o crear por student
router.get('/student/:studentId', verifyToken, authorize("Admin", "Gabinete", "Docente"), CaseFileController.getById);

// cerrar legajo
router.patch('/:id/close', verifyToken, authorize("Admin", "Gabinete"), CaseFileController.close);

// reabrir legajo
router.patch('/:id/reopen', verifyToken, authorize("Admin", "Gabinete"), CaseFileController.reopen);

router.get('/:id', verifyToken, authorize("Admin", "Gabinete", "Docente"), CaseFileController.getCaseFileById);

export default router;