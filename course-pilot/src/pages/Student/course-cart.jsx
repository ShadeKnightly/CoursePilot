import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import CardComp from "../../components/card/cardComponent";
import ClassItem from "../../components/ClassItem/classItem";
import { mockCourses } from "../../data";

const CourseCart = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    const storedData = JSON.parse(localStorage.getItem("userCourses")) || {};
    const userCourseIds = storedData[currentUser.id]?.cart || [];
    const userCourses = mockCourses.filter((c) =>
      userCourseIds.includes(c.id)
    );
    setCourses(userCourses);
    setLoading(false);
  }, [currentUser, navigate]);


  const handleRemove = (courseId) => {
    const storedData = JSON.parse(localStorage.getItem("userCourses")) || {};
    const updated = (storedData[currentUser.id]?.cart || []).filter(
      (id) => id !== courseId
    );
    storedData[currentUser.id] = {
      ...storedData[currentUser.id],
      cart: updated,
    };
    localStorage.setItem("userCourses", JSON.stringify(storedData));
    setCourses((prev) => prev.filter((c) => c.id !== courseId));
  };

  const handleConfirmRegistration = () => {
    if (courses.length === 0) {
      alert("Your cart is empty! Please add some courses first.");
      return;
    }

    const userId = currentUser.id;

    // Load current localStorage data
    const userCoursesData = JSON.parse(localStorage.getItem("userCourses")) || {};
    const registeredData = JSON.parse(localStorage.getItem("registeredCourses")) || {};

    const cartCourseIds = userCoursesData[userId]?.cart || [];
    if (!Array.isArray(cartCourseIds)) return alert("Cart data corrupted, please try again.");

    // Merge with existing registered courses (if any)
    const existingRegistered = registeredData[userId] || [];
    const updatedRegistered = [...new Set([...existingRegistered, ...cartCourseIds])];

    // Save updated registered courses
    registeredData[userId] = updatedRegistered;
    localStorage.setItem("registeredCourses", JSON.stringify(registeredData));

    // Clear the user's cart
    userCoursesData[userId] = [];
    localStorage.setItem("userCourses", JSON.stringify(userCoursesData));

    // Clear state and navigate
    setCourses([]);
    alert("Registration confirmed! Redirecting to your courses...");
    navigate("/courses");
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
        {loading ? ( <p> Loading your courses...</p> ) : 
        courses.length === 0 ? (
          <p>No courses in cart.</p>
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
            {/*confirm Registration Button */}
            <button
              onClick={handleConfirmRegistration}
              style={{
                marginTop: "20px",
                padding: "12px 24px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Confirm Registration
            </button>

          </>
        )}
      </CardComp>
    </main>
  );
};

export default CourseCart;
