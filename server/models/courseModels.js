import { poolPromise } from "../config/db.js";
import sql from 'mssql';

export const getAllCourses = async () => {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM Courses");

    return result.recordset;
}

export const getAllPrograms = async () => {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM Programs");

    return result.recordset;
}

export const createCourse = async (code, name, term, dateRange, desc) => {
    const pool = await poolPromise;
    await pool.request()
        .input('code', sql.NVarChar, code)
        .input('name', sql.NVarChar, name)
        .input('term', sql.VarChar, term)
        .input('dateRange', sql.VarChar, dateRange)
        .input('desc', sql.VarChar, desc)
        .query("INSERT INTO Courses(courseCode, CourseName, term, dateRange, c_Description) VALUES (@code, @name, @term, @dateRange, @desc)");
}

export const updateCourse = async(id, code, name, term, dateRange, desc) => {
    const pool = await poolPromise;

    await pool.request()
        .input('id', sql.Int, id)
        .input('code', sql.NVarChar, code)
        .input('name', sql.NVarChar, name)
        .input('term', sql.VarChar, term)
        .input('dateRange', sql.VarChar, dateRange)
        .input('desc', sql.VarChar, desc)
        .query("UPDATE Courses SET courseCode = @code, CourseName = @name, term = @term, dateRange = @dateRange, c_Description = @desc WHERE courseID = @id");
}

export const deleteCourse = async (id) => {
    const pool = await poolPromise;
    try{
        await pool.request()
            .input('id', sql.Int, id)
            .query("DELETE FROM Courses WHERE courseID = @id");
    } catch(error){
        if(error.number === 547){
            return{
                success: false,
                message: "Cannot delete course; it is referenced by other records."
            };
        }
        throw error;
    }
}