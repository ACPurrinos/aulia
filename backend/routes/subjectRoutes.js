import express from 'express';
const router = express.Router();
import subjectController from '../controllers/subjectControllers.js';

router.get('/subjects', subjectController.getAllSubjects);
router.get('/subjectId/:id', subjectController.findSubjectById);
router.post('/saveSubject', subjectController.saveSubject);
router.put('/updateSubject/:id', subjectController.updateSubject);
router.delete('/deleteSubject/:id', subjectController.deleteSubject);

export default router;