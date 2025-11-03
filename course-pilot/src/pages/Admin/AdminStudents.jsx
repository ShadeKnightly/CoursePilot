import React, {useState} from 'react';
import CardComp from '../../components/card/cardComponent';
import ClassItem from '../../components/ClassItem/classItem';
import './AdminStudents.css';

// Fixed data to clearly represent student records
const initialStudentData = [
     {
        name: 'Alice Johnson', 
        program: 'Software Development', 
        department: 'CST' 
    },
    {
        name: 'Bob Williams', 
        program: 'Data Analytics', 
        department: 'Analytics' 
    },
    {
        name: 'Charlie Davis', 
        program: 'IT Operations', 
        department: 'Networking' 
    },
];

const AdminStudents = () => {
 // Student Data is managed by state
const [students, setStudents] = useState(initialStudentData); 

 return (
 <CardComp title={'Students'}>

    {students.map((student, index) => (
    <ClassItem 
    key={index}
    name={student.name}
    program={student.program}
    department={student.department}
    // Use the prop name 'isAdminStudent as defined in ClassItem
    isAdminStudent={true}
    />
    ))}
    </CardComp>
   )
}

export default AdminStudents;