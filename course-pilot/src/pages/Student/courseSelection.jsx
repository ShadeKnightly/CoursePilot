import React, { useState, useEffect } from "react";
import CardComp from "../../components/card/cardComponent";
import ClassItem from "../../components/ClassItem/classItem";

const CourseSelection = () => {
  // Mocked data fetch
  const fetchCourses = () => {
    // Simulate a fake API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            courseCode: "COMP101",
            name: "Intro to Programming",
            term: "Fall 2025",
            startEnd: "Sept 1 - Dec 15",
            program: "Software Development",
            description: "Learn the basics of programming in C# and problem solving.",
          },
          {
            id: 2,
            courseCode: "WEB201",
            name: "Web Development",
            term: "Winter 2026",
            startEnd: "Jan 5 - Mar 30",
            program: "Software Development",
            description: "Covers HTML, CSS, JavaScript, and modern frameworks.",
          },
        ]);
      }, 1000);
    });
  };

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Mock API call on component mount
    fetchCourses().then((data) => setCourses(data));
  }, []);

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
          <p>Loading available courses...</p>
        ) : (
          courses.map((course) => (
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
          ))
        )}
      </CardComp>
    </main>
  );
};

export default CourseSelection;
