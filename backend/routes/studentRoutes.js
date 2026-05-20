import express from 'express';
const router = express.Router();
import studentController from '../controllers/studentController.js';

router.get('/students', studentController.findAllStudents);
router.get('/studentId/:id', studentController.findStudentById);
router.post('/saveStudent/', studentController.saveStudent);
router.put('/updateStudent/:id', studentController.updateStudent);
router.delete('/deleteStudent/:id', studentController.deleteStudent);

export default router;