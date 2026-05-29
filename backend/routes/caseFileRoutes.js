import express from 'express';
import CaseFileController from '../controllers/CaseFileController.js';

const router = express.Router();

// crear legajo
router.post('/', CaseFileController.create);

// obtener o crear por student
router.get('/student/:studentId', CaseFileController.getById);

// cerrar legajo
router.patch('/:id/close', CaseFileController.close);

// reabrir legajo
router.patch('/:id/reopen', CaseFileController.reopen);

router.get('/:id', CaseFileController.getCaseFileById);

export default router;