import express from 'express';
const router = express.Router();
import courseController from '../controllers/courseController.js';
import validateRequest from '../middlewares/validateRequest.js';
import { createCourseSchema } from '../validators/courseValidator.js';
import { verifyToken, authorize } from '../middlewares/authMiddleware.js';


router.get('/activeCourses', verifyToken, authorize("Admin"),  courseController.getAllActiveCourses);
router.get('/findCourse/:id', verifyToken, authorize("Admin"), courseController.findCourseById);
router.get('/findWithTeachers/:id', verifyToken, authorize("Admin"), courseController.findCourseWithTeachers);
router.get('/findWithStudents/:id', verifyToken, authorize("Admin"), courseController.findCourseWithStudents);
router.post('/saveCourse/', verifyToken, authorize("Admin"), validateRequest(createCourseSchema), courseController.saveCourse);
router.patch('/desactiveCourse/:id', verifyToken, authorize("Admin"), courseController.desactive);

export default router;