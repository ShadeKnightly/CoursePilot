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
  
  // Mocked data fetch

const fetchAllCourses = () => {
  return new Promise((resolve) => {
    console.log("Fetching all available courses...");
    setTimeout(() => {
      resolve(mockCourses);
    }, 1000);
  });
};
useEffect(() => {
    // Check if user is signed in
    if (!currentUser) {
      navigate("/login");
      return;
    }

    const selectedTerm = currentUser?.selectedTerm || "";
    setUserTerm(selectedTerm);

    // Fetch and filter courses by term
    fetchAllCourses().then((data) => {
      const filtered = data.filter((course) =>
        course.term.toLowerCase().includes(selectedTerm.toLowerCase())
      );
      setCourses(filtered);
    });
  }, [navigate, currentUser]);

  const handleAdd = (courseId) => {
    console.log(`Added course with ID: ${courseId}`);
  };

  const handleRemove = (courseId) => {
    console.log(`Removed course with ID: ${courseId}`);
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
              />
            ))}
          </>
        )}
      </CardComp>
    </main>
  );
};

export default CourseSelection;
