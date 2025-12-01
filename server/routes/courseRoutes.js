import express from 'express';
import { createCourseController, deleteCourseController, getCoursesController, getProgramsController, updateCourseController } from '../controllers/courseControllers.js';


const router = express.Router();

//get all programs
router.get('/programs', getProgramsController);

//get all courses
router.get('/courses', getCoursesController);

// create course
router.post('/course', createCourseController);

// update course
router.put('/:id/course', updateCourseController);

// delete course
router.delete('/:id/course', deleteCourseController);


export default router;