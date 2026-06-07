import express from 'express';
const router = express.Router();
import studentController from '../controllers/studentController.js';
import validateRequest from '../middlewares/validateRequest.js';
import { createStudentSchema, updateStudentSchema } from '../validators/studentValidator.js';
import { verifyToken, authorize } from '../middlewares/authMiddleware.js';


router.get('/students', verifyToken, authorize("Admin"), studentController.findAllStudents);
router.get('/withoutActiveCase', verifyToken, authorize("Admin", "Gabinete"), studentController.findAllStudentsWithoutCaseFile);
router.get('/activeStudents', verifyToken, authorize("Admin", "Gabinete"), studentController.findActiveStudents);
router.get('/studentsByTeacher/:id', verifyToken, authorize("Admin", "Docente", "Gabinete"), studentController.findAllStudentsByTeacher);
router.get('/studentId/:id', verifyToken, authorize("Admin", "Docente", "Gabinete"), studentController.findStudentById);
router.get('/byUser/:id', verifyToken, authorize("Admin", "Alumno"), studentController.findStudentByUserId);
router.post('/saveStudent/', verifyToken, authorize("Admin"), validateRequest(createStudentSchema), studentController.saveStudent);
router.put('/updateStudent/:id', verifyToken, authorize("Admin"), validateRequest(updateStudentSchema), studentController.updateStudent);
router.delete('/deleteStudent/:id', verifyToken, authorize("Admin"), studentController.deleteStudent);

export default router;