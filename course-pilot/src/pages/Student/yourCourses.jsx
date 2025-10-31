import React, { useState, useEffect } from "react";
import CardComp from "../../components/card/cardComponent";
import ClassItem from "../../components/ClassItem/classItem";

const UserCourses = () => {

  // Simulate fetching the user's cart from a mock "database"
  const fetchUserCart = (userId) => {
    return new Promise((resolve) => {
      console.log(`Fetching cart for user: ${userId}`);
      setTimeout(() => {
        // Simulate data stored for a specific user
        const mockDatabase = {
          "1234556": [
            {
              id: 1,
              courseCode: "COMP101",
              name: "Intro to Programming",
              term: "Fall 2025",
              startEnd: "Sept 1 - Dec 15",
              program: "Software Development",
              description:
                "Learn the basics of programming in C# and problem solving.",
            },
            {
              id: 2,
              courseCode: "WEB201",
              name: "Web Development",
              term: "Winter 2026",
              startEnd: "Jan 5 - Mar 30",
              program: "Software Development",
              description:
                "Covers HTML, CSS, JavaScript, and modern frameworks.",
            },
          ],
        };

        // Return the user's cart if found, otherwise an empty array
        resolve(mockDatabase[userId] || []);
      }, 1000);
    });
  };

  const [courses, setCourses] = useState([]);
  const userId = "1234556"; // mock logged-in user ID

  useEffect(() => {
    // Fetch the cart when component mounts
    fetchUserCart(userId).then((data) => setCourses(data));
  }, [userId]);

  const handleRemove = (courseId) => {
    console.log(`Removed course with ID: ${courseId}`);
    setCourses((prev) => prev.filter((course) => course.id !== courseId));
  };

  return (
    <main style={{ padding: "2rem" }}>
      <CardComp title={`Your Cart`}>
        {courses.length === 0 ? (
          <p>Loading your courses...</p>
        ) : (
          <>
            {courses.map((course) => (
              <ClassItem
                key={course.id}
                courseCode={course.courseCode}
                name={course.name}
                term={course.term}
                startEnd={course.startEnd}
                program={course.program}
                description={course.description}
                onRemove={() => handleRemove(course.id)}
              />
            ))}
          </>
        )}
      </CardComp>
    </main>
  );
};

export default UserCourses;
