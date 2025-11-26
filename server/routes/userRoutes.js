import express from 'express';
import { checkoutCourseController, getStudentCoursesController, getStudentsController, registerUserToTermController, sendMessageController, updateUserProfileController, userSignInController, userSignUpController, userUnregisterController, viewMessagesController } from '../controllers/userControllers.js';


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
router.post('/:id/sendmessage', sendMessageController);

// admin view messages
router.get('/messages', viewMessagesController);


export default router;