import express from 'express';
import { checkoutCourseController, getStudentCoursesController, getStudentsController, registerUserToTermController, updateUserProfileController, userSignInController, userSignUpController, userUnregisterController } from '../controllers/userControllers';


const router = express.Router();
//get all students
router.get('/students', getStudentsController);

// user signup
router.post('/signUp', userSignUpController);

// user signin
router.post('/signIn', userSignInController);

// user courses
router.get('/:id/courses', getStudentCoursesController);

// user term registration
router.post('/:id/registration', registerUserToTermController);

// user course registration(course checkout)
router.post('/:id/checkout', checkoutCourseController);

// user update profile
router.put('/:id', updateUserProfileController);

// user delete course(unregister)
router.delete('/:id/unregister', userUnregisterController);

// user send message
router.post('',);

// admin view messages
router.get('',);


export default router;