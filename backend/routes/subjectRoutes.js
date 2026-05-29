import express from 'express';
const router = express.Router();
import subjectController from '../controllers/subjectControllers.js';
import validateRequest from '../middlewares/validateRequest.js';
import { createSubjectSchema, updateSubjectSchema } from '../validators/subjectValidator.js';
import { verifyToken, authorize } from '../middlewares/authMiddleware.js';


router.get('/subjects', verifyToken, authorize("Admin", "Docente", "Gabinete"), subjectController.getAllSubjects);
router.get('/subjectId/:id', verifyToken, authorize("Admin", "Docente", "Gabinete"), subjectController.findSubjectById);
router.post('/saveSubject', verifyToken, authorize("Admin"), validateRequest(createSubjectSchema), subjectController.saveSubject);
router.put('/updateSubject/:id', verifyToken, authorize("Admin"), validateRequest(updateSubjectSchema), subjectController.updateSubject);
router.delete('/deleteSubject/:id', verifyToken, authorize("Admin"), subjectController.deleteSubject);

export default router;