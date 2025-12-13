import express from 'express';
import { checkoutCourseController, getStudentCoursesController, getStudentsController, registerUserToTermController, sendMessageController, updateUserProfileController, userSignInController, userSignUpController, userUnregisterController, viewMessagesController, deleteMessageController, bulkUnregisterController, getCurrentUserController, logoutController } from '../controllers/userControllers.js';
import { verifyToken } from '../middleware/authMiddlewares.js';

const router = express.Router();
//get all students
router.get('/students', getStudentsController);

// user signup
router.post('/signUp', userSignUpController);

// user signin
router.post('/signIn', userSignInController);

// user logout (protected)
router.post('/logout', verifyToken, logoutController);

// get user (protected)
router.get('/me', verifyToken, getCurrentUserController);

// user courses (protected)
router.get('/:id/courses', verifyToken, getStudentCoursesController);

// user term registration (protected)
router.patch('/:id/registration', verifyToken, registerUserToTermController);

// user course registration(course checkout) (protected)
router.post('/:id/checkout', verifyToken, checkoutCourseController);

// user update profile (protected)
router.patch('/:id/profile', verifyToken, updateUserProfileController);

// user delete course(unregister) (protected)
router.delete('/:id/unregister', verifyToken, userUnregisterController);

// user bulk delete courses (unregister all) (protected)
router.delete('/:id/registrations', verifyToken, bulkUnregisterController);

// user send message (protected)
router.post('/messages/:id', verifyToken, sendMessageController);

// admin view messages
router.get('/messages', viewMessagesController);

//delete message
router.delete('/messages/:messageId', deleteMessageController);


export default router;