import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import CardComp from "../../components/card/cardComponent";
import ClassItem from "../../components/ClassItem/classItem";
import { mockCourses } from "../../data";

const CourseCart = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    const storedData = JSON.parse(localStorage.getItem("userCourses")) || {};
    const userCourseIds = storedData[currentUser.id] || [];
    const userCourses = mockCourses.filter((c) =>
          userCourseIds.includes(c.id)
        );
        setCourses(userCourses);
  }, [currentUser, navigate]);
  const handleRemove = (courseId) => {
    const storedData = JSON.parse(localStorage.getItem("userCourses")) || {};
    const updated = (storedData[currentUser.id] || []).filter(
      (id) => id !== courseId
    );
    storedData[currentUser.id] = updated;
    localStorage.setItem("userCourses", JSON.stringify(storedData));
    setCourses((prev) => prev.filter((c) => c.id !== courseId));
  };


  return (
    <main style={{ padding: "2rem" }}>
      <CardComp title={`Your Cart`}>
        {/* Back Button */}
            <button
              onClick={() => navigate("/courseSelect")}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                backgroundColor: "var(--color-accent)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              ← Back to Course Registration
            </button>
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
                isSignedIn={!!currentUser} //convert null/undefined to false valid user object into true.
              />
            ))}

            
          </>
        )}
      </CardComp>
    </main>
  );
};

export default CourseCart;
