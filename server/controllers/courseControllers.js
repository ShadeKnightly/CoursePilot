import * as courseModel from '../models/courseModels';

export const getProgramsController = async (req, res) =>{
    try{
        const programs = await courseModel.getAllPrograms();

        res.status(200).json(programs);
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

export const getCoursesController = async (req, res) => {
    try{
        const courses = await courseModel.getAllCourses();
        res.status(200).json(courses);
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

export const createCourseController = async (req, res) => {
    try{
        const {code, name, term, dateRange, desc} = req.body;

        if(!code || !name || !term || !dateRange || !desc)
            return res.status(400).json({message: 'All fields required'});

        await courseModel.createCourse(code, name, term, dateRange, desc);
        res.status(201).json({message: 'Course created successfully'});
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

export const updateCourseController = async (req, res) => {
    try{
        const { id } = req.params;
        const { code, name, term, dateRange, desc } = req.body;

        if(!code || !name || !term || !dateRange || !desc)
            return res.status(400).json({message: 'All fields required'});

        await courseModel.updateCourse(id, code, name, term, dateRange, desc);
        
        res.status(200).json({message: 'Course updated successfully'});
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

export const deleteCourseController = async (req, res) => {
    try{
        const { id } = req.params;

        await courseModel.deleteCourse(id);
        res.status(200).json({message: 'course successfully deleted'})    
    }catch(error){
        res.status(500).json({message: error.message});
    }
}