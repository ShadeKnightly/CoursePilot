import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import CardComp from "../../components/card/cardComponent";
import ClassItem from "../../components/ClassItem/classItem";
import { mockCourses } from "../../data";

const CourseSelection = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);

  const [courses, setCourses] = useState([]);
  const [userTerm, setUserTerm] = useState("");
  const [userCourses, setUserCourses] = useState([]);

  // retrieve all mock courses
  const fetchAllCourses = () => {
    return new Promise((resolve) => {
      console.log("Fetching all available courses...");
      setTimeout(() => {
        resolve(mockCourses);
      }, 500);
    });
  };
  // Load user courses from localStorage
  const loadUserCourses = (userId) => {
    const storedData = JSON.parse(localStorage.getItem("userCourses")) || {};
    return storedData[userId] || [];
  };
  
  // Save updated user courses to localStorage
  const saveUserCourses = (userId, courses) => {
    const storedData = JSON.parse(localStorage.getItem("userCourses")) || {};
    storedData[userId] = courses;
    localStorage.setItem("userCourses", JSON.stringify(storedData));
  };

useEffect(() => {
    // Check if user is signed in
    if (!currentUser) {
      navigate("/login");
      return;
    }

    const selectedTerm = currentUser?.selectedTerm || "";
    setUserTerm(selectedTerm);

    // Load user’s current course selections
    const existingCourses = loadUserCourses(currentUser.id);
    setUserCourses(existingCourses)

    // Fetch and filter courses by term
    fetchAllCourses().then((data) => {
      const filtered = data.filter((course) =>
        course.term.toLowerCase().includes(selectedTerm.toLowerCase())
      );
      setCourses(filtered);
    });
  }, [navigate, currentUser]);

  const handleAdd = (courseId) => {
    if (!userCourses.includes(courseId)) {
      const updated = [...userCourses, courseId];
      setUserCourses(updated);
      saveUserCourses(currentUser.id, updated);
      console.log(`Added course ID: ${courseId}`);
    }
  };

  const handleRemove = (courseId) => {
    const updated = userCourses.filter((id) => id !== courseId);
    setUserCourses(updated);
    saveUserCourses(currentUser.id, updated);
    console.log(`Removed course ID: ${courseId}`);
  };
  
  return (
    <main style={{ padding: "2rem" }}>
      <CardComp title={`Course Selection`}>
        {courses.length === 0 ? (
          <p>
            {userTerm
              ? `No courses found for ${userTerm}.`
              : "Loading available courses..."}
          </p>
        ) : (
          <>
            <div className="term-banner">
              <h3>
                Showing courses for: <strong>{userTerm}</strong>
              </h3>
            </div>
            {courses.map((course) => (
              <ClassItem
                key={course.id}
                courseCode={course.courseCode}
                name={course.name}
                term={course.term}
                startEnd={course.startEnd}
                program={course.program}
                description={course.description}
                onAdd={() => handleAdd(course.id)}
                onRemove={() => handleRemove(course.id)}
                isSignedIn={!!currentUser} //convert null/undefined to false valid user object into true.
              />
            ))}
          </>
        )}
      </CardComp>
    </main>
  );
};

export default CourseSelection;
