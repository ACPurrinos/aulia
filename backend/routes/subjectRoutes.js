import express from 'express';
const router = express.Router();
import subjectController from '../controllers/subjectControllers.js';
import validateRequest from '../middlewares/validateRequest.js';
import { createSubjectSchema, updateSubjectSchema } from '../validators/subjectValidator.js';


router.get('/subjects', subjectController.getAllSubjects);
router.get('/subjectId/:id', subjectController.findSubjectById);
router.post('/saveSubject', validateRequest(createSubjectSchema), subjectController.saveSubject);
router.put('/updateSubject/:id', validateRequest(updateSubjectSchema), subjectController.updateSubject);
router.delete('/deleteSubject/:id', subjectController.deleteSubject);

export default router;