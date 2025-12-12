import bcrypt from 'bcrypt';
import * as userModel from '../models/userModels.js';
import generateToken from '../utils/generateToken.js';

export const getStudentsController = async (req, res) =>{
    try{
        const students = await userModel.getAllStudents();
        res.status(200).json(students);
    } catch(error){
        res.status(500).json({message: error.message});
    }
};

export const userSignInController = async (req, res) => {
    try{
        const { username, password } = req.body
        const user = await userModel.findUserByUsername(username);

        //run bcrypt verification
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        //jwt token gen
        const token = generateToken(user);

        //set token to cookie
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        const { password: userPassword, ...safeUser} = user;

        res.status(200).json(safeUser);
    } catch(error){
        res.status(500).json({message: error.message});
    }
} 

export const userSignUpController = async (req, res) => {
    try{
        const {firstname, lastname, email, phone, birthday, department, program, username, password} = req.body;

        if(!firstname || !lastname || !email || !phone || !birthday || !department || !program || !username || !password)
            return res.status(400).json({message: 'All fields are required'});
        
        const hashedPass = await bcrypt.hash(password, 10);

        await userModel.createUser(firstname, lastname, email, phone, birthday, department, program, username, hashedPass);
        
        res.status(201).json({message: 'User created successfully'});
    } catch(error){
        console.error("Sign up error:", error.message);
        res.status(500).json({error: 'failed to register user', details: error.message})
    }
}

export const getStudentCoursesController = async (req, res) => {
    try{
        const { id } = req.params;
        const courses = await userModel.getAllStudentCourses(id);

        res.status(200).json(courses);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

export const registerUserToTermController = async (req, res) => {
    try{
        const { id } = req.params;
        const { term, unregisterPrevious } = req.body;

        if(!term)
            return res.status(400).json({message: 'Valid Term required' });

        // If requested, unregister all existing courses before switching term
        if (unregisterPrevious) {
            await userModel.unregisterAllCourses(id);
        }
        await userModel.registerUserTerm(id, term);
        res.status(200).json({message: 'user term updated'});
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

export const bulkUnregisterController = async (req, res) => {
    try {
        const { id } = req.params;
        await userModel.unregisterAllCourses(id);
        res.status(200).json({ message: 'All courses successfully unregistered' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const checkoutCourseController = async (req, res) => {
    try{
        const {id} = req.params;
        const {courseId} = req.body;

        if(!courseId)
            return res.status(400).json({message: 'Valid course required'});
        await userModel.courseRegistration(id, courseId);
        res.status(200).json({message: 'course successfully registered'});
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

export const updateUserProfileController = async (req, res) => {
    try{
        const { id } = req.params;
        const { phone, email } = req.body

        if(!phone)
            return res.status(400).json({message: 'Valid phone number required'});
        if(!email)
            return res.status(400).json({message: 'Valid email required'});

        await userModel.updateProfile(id, phone, email);
        res.status(200).json({message: 'User profile updated successfully'});
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

export const userUnregisterController = async (req, res) => {
    try{
        const { id } = req.params;
        const { courseId } = req.body;

         if(!courseId || isNaN(courseId))
            return res.status(400).json({message: 'Valid course required'});
        await userModel.unregisterFromCourse(id, courseId);
        res.status(200).json({message: 'course successfully unregistered'});

    }catch(error){
        res.status(500).json({message: error.message});
    }
}

export const sendMessageController = async (req, res) =>{
    try{
        const { id } = req.params;
        const { message } = req.body;

        if(!message){
            return res.status(400).json({message: 'Valid message required'})
        }
        await userModel.sendMessage(id, message);
        res.status(200).json({message: 'message sent'});
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

export const viewMessagesController = async (req, res) =>{
    try{
        const messages = await userModel.getMessages();
        res.status(200).json(messages);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

export const deleteMessageController = async (req, res) => {
    try {
        const { messageId } = req.params;  
        await userModel.deleteMessage(messageId);
        res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}