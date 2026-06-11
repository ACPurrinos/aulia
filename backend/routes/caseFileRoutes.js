import express from 'express';
import caseFileController from '../controllers/caseFileController.js';
import validateRequest from '../middlewares/validateRequest.js';
import { createCaseFileSchema } from '../validators/caseFileValidator.js';
import { verifyToken, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

// crear legajo
router.post('/', verifyToken, authorize("Admin", "Gabinete"), validateRequest(createCaseFileSchema), caseFileController.create);

// obtener o crear por student
router.get('/student/:studentId', verifyToken, authorize("Admin", "Gabinete", "Docente"), caseFileController.getById);

// cerrar legajo
router.patch('/:id/close', verifyToken, authorize("Admin", "Gabinete"), caseFileController.close);

// reabrir legajo
router.patch('/:id/reopen', verifyToken, authorize("Admin", "Gabinete"), caseFileController.reopen);

router.get('/:id', verifyToken, authorize("Admin", "Gabinete", "Docente"), caseFileController.getCaseFileById);

export default router;