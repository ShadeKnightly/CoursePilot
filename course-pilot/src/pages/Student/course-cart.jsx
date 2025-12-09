import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import CardComp from "../../components/card/cardComponent";
import ClassItem from "../../components/ClassItem/classItem";

const CourseCart = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [registering, setRegistering] = useState(false);
  const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    fetchCartCourses();
  }, [currentUser, navigate]);

  const fetchCartCourses = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get cart items from localStorage
      const storedData = JSON.parse(localStorage.getItem("userCourses")) || {};
      const cartCourseIds = storedData[currentUser.userID]?.cart || [];

      if (cartCourseIds.length === 0) {
        setCourses([]);
        setLoading(false);
        return;
      }

      // Fetch all courses from backend
      const res = await fetch(`${API_BASE}/course/auth/courses`);

      if (!res.ok) {
        throw new Error(`Error fetching courses: ${res.statusText}`);
      }

      const allCourses = await res.json();
      
      // Filter to only cart courses
      const cartCourses = allCourses.filter(course => 
        cartCourseIds.includes(course.courseID)
      );

      setCourses(cartCourses || []);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = (courseId) => {
    // Remove from localStorage cart
    const storedData = JSON.parse(localStorage.getItem("userCourses")) || {};
    const updated = (storedData[currentUser.userID]?.cart || []).filter(
      (id) => id !== courseId
    );
    storedData[currentUser.userID] = {
      ...storedData[currentUser.userID],
      cart: updated,
    };
    localStorage.setItem("userCourses", JSON.stringify(storedData));
    
    // Remove from state
    setCourses((prev) => prev.filter((c) => c.courseID !== courseId));
  };

  const handleConfirmRegistration = async () => {
    if (courses.length === 0) {
      alert("Your cart is empty! Please add some courses first.");
      return;
    }

    setRegistering(true);
    const userId = currentUser.userID;
    let successCount = 0;
    let failedCourses = [];

    try {
      // Register each course via checkout API
      for (const course of courses) {
        try {
          const res = await fetch(`${API_BASE}/user/auth/${userId}/checkout`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ courseId: course.courseID }),
          });

          if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err.message || `Failed to register: ${res.status}`);
          }

          successCount++;
        } catch (error) {
          console.error(`Failed to register for ${course.courseCode}:`, error);
          failedCourses.push(`${course.courseCode} - ${error.message}`);
        }
      }

      // Clear the cart if at least one course was registered
      if (successCount > 0) {
        const storedData = JSON.parse(localStorage.getItem("userCourses")) || {};
        storedData[userId] = { cart: [] };
        localStorage.setItem("userCourses", JSON.stringify(storedData));
        setCourses([]);
      }

      // Show results
      if (failedCourses.length === 0) {
        alert(`Successfully registered for all ${successCount} courses!`);
        navigate("/courses");
      } else if (successCount > 0) {
        alert(
          `Registered for ${successCount} course(s).\n\nFailed courses:\n${failedCourses.join("\n")}`
        );
      } else {
        alert(`Failed to register for any courses:\n${failedCourses.join("\n")}`);
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert(`Registration failed: ${error.message}`);
    } finally {
      setRegistering(false);
    }
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

        {loading ? (
          <p>Loading your courses...</p>
        ) : error ? (
          <p style={{ color: "red" }}>Error: {error}</p>
        ) : courses.length === 0 ? (
          <div>
            <p>No courses in cart.</p>
            <p style={{ marginTop: "1rem", color: "#666" }}>
              Go to Course Registration to add courses to your cart.
            </p>
          </div>
        ) : (
          <>
            {courses.map((course) => (
              <ClassItem
                key={course.courseID}
                courseCode={course.courseCode}
                name={course.CourseName}
                term={course.term}
                startEnd={course.dateRange}
                description={course.c_Description}
                onRemove={() => handleRemove(course.courseID)}
                isSignedIn={!!currentUser}
              />
            ))}

            {/* Confirm Registration Button */}
            <button
              onClick={handleConfirmRegistration}
              disabled={registering}
              style={{
                marginTop: "20px",
                padding: "12px 24px",
                backgroundColor: registering ? "#ccc" : "#28a745",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: registering ? "not-allowed" : "pointer",
                fontWeight: "bold",
              }}
            >
              {registering ? "Registering..." : "Confirm Registration"}
            </button>
          </>
        )}
      </CardComp>
    </main>
  );
};

export default CourseCart;
