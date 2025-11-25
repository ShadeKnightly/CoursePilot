import { poolPromise } from "../config/db";
import sql, { pool } from "mssql";

export async function getAllStudents() {
    try{
        const pool = await poolPromise;
        const result = await pool.request().query("SELECT * FROM Users WHERE role = student");

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
    .input('firstname', sql.NVarChar, firstname)
    .input('lastname', sql.NVarChar, lastname)
    .input('email', sql.NVarChar, email)
    .input('phone', sql.VarChar, phone)
    .input('birthday', sql.DateTime, birthday)
    .input('department', sql.NVarChar, department)
    .input('program', sql.NVarChar, program)
    .input('username', sql.NVarChar, username)
    .input('hashedPass', sql.NVarChar, hashedPass)
    .query('INSERT INTO Users(firstname, lastname, email, phone, birthday, department, program, username, hashedPass) VALUES (@firstname, @lastname, @email, @phone, @birthday, @department, @program, @username, @hashedPass)');
}

export const getAllStudentCourses = async (id) => {
    try {
        const pool = poolPromise;

        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM Courses WHERE userId = @id');

        return result.recordset;
    }catch(error){
        throw new Error("failed to find courses " + error.message);
    }
    
}

export const registerUserTerm = async (id, term) => {
    const pool = poolPromise;

    await pool.request()
        .input('id', sql.Int, id)
        .input('term', sql.NVarChar, term)
        .query('UPDATE Users SET term = @term WHERE id = @id');
}

export const courseRegistration = async (id, courseId) =>{
    const pool = poolPromise;

    await pool.request()
        .input('id', sql.Int, id)
        .input('courseId', sql.Int, courseId)
        .query('INSERT INTO studying(userId, courseId) VALUES(@id, @courseId)');
}

export const updateProfile = async (id, phone, email) =>{
    const pool = poolPromise;

    await pool.request()
        .input('id', sql.Int, id)
        .input('phone', sql.VarChar, phone)
        .input('email', sql.NVarChar, email)
        .query('UPDATE Users SET phone = @phone, email = @email WHERE userId = @id');
}

export const unregisterFromCourse = async (id, courseId) =>{
    const pool = poolPromise;

    await pool.request()
        .input('id', sql.Int, id)
        .input('courseId', sql.Int, courseId)
        .query('DELETE FROM studying WHERE userId = @id AND courseId = @courseId');
}