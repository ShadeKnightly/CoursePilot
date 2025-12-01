import { poolPromise } from "../config/db.js";
import sql from "mssql";

export async function getAllStudents() {
    try{
        const pool = await poolPromise;
        const result = await pool.request().query("SELECT * FROM Users WHERE role = 'student'");

        return result.recordset;
    }catch(error){
        throw new Error("Failed to fetch users: " + error.message);
    }
}

export async function findUserByUsername(username){
    try{
        const pool = await poolPromise;
        const result = await pool.request().input("username", sql.NVarChar, username).query("SELECT * FROM Users WHERE username = @username");
        
        return result.recordset[0];
    }catch(error){
        throw new Error("Failed to find user: " + error.message);
    }
}

export const createUser = async (firstname, lastname, email, phone, birthday, department, program, username, hashedPass) => {
    const pool = await poolPromise;

    await pool.request()
    .input('firstname', sql.VarChar, firstname)
    .input('lastname', sql.VarChar, lastname)
    .input('email', sql.NVarChar, email)
    .input('phone', sql.NVarChar, phone)
    .input('birthday', sql.Date, birthday)
    .input('department', sql.VarChar, department)
    .input('program', sql.VarChar, program)
    .input('username', sql.NVarChar, username)
    .input('hashedPass', sql.NVarChar, hashedPass)
    .query('INSERT INTO Users(firstname, lastname, email, phone, birthday, department, program, username, password) VALUES (@firstname, @lastname, @email, @phone, @birthday, @department, @program, @username, @hashedPass)');
}

export const getAllStudentCourses = async (id) => {
    try {
        const pool = await poolPromise;

        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT c.* FROM Studying s JOIN Courses c ON s.courseID = c.courseID WHERE s.userID = @id');

        return result.recordset;
    }catch(error){
        throw new Error("failed to find courses " + error.message);
    }
    
}

export const registerUserTerm = async (id, term) => {
    const pool = await poolPromise;

    await pool.request()
        .input('id', sql.Int, id)
        .input('term', sql.NVarChar, term)
        .query('UPDATE Users SET term = @term WHERE userId = @id');
}

export const courseRegistration = async (id, courseId) =>{
    const pool = await poolPromise;

    await pool.request()
        .input('id', sql.Int, id)
        .input('courseId', sql.Int, courseId)
        .query('INSERT INTO Studying(userId, courseId) VALUES(@id, @courseId)');
}

export const updateProfile = async (id, phone, email) =>{
    const pool = await poolPromise;

    await pool.request()
        .input('id', sql.Int, id)
        .input('phone', sql.VarChar, phone)
        .input('email', sql.NVarChar, email)
        .query('UPDATE Users SET phone = @phone, email = @email WHERE userId = @id');
}

export const unregisterFromCourse = async (id, courseId) =>{
    const pool = await poolPromise;

    await pool.request()
        .input('id', sql.Int, id)
        .input('courseId', sql.Int, courseId)
        .query('DELETE FROM Studying WHERE userId = @id AND courseId = @courseId');
}

export const sendMessage = async (id, message) =>{
    const pool = await poolPromise;
    const currentDate = new Date();

    await pool.request()
        .input('id', sql.Int, id)
        .input('currentDate', sql.DateTime, currentDate)
        .input('message', sql.NVarChar, message)
        .query('INSERT INTO userMessages(userId, createdAt, msg) VALUES(@id, @currentDate, @message)');
}

export const getMessages = async () => {
    const pool = await poolPromise;

    const result = await pool.request().query('SELECT * FROM userMessages');
    return result.recordset;
}