import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import CardComp from "../../components/card/cardComponent";
import ClassItem from "../../components/ClassItem/classItem";

const CourseSelection = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);

  const [courses, setCourses] = useState([]);
  const [userTerm, setUserTerm] = useState("");
  const [userCourses, setUserCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

  // Fetch all courses from backend


  // Load user courses (cart) from localStorage
  const loadUserCourses = (userId) => {
    const storedData = JSON.parse(localStorage.getItem("userCourses")) || {};
    const userData = storedData[userId] || { cart: [], registered: [] };
    return Array.isArray(userData.cart) ? userData.cart : [];
  };

  // Save updated user courses (cart) to localStorage
  const saveUserCourses = (userId, updatedCart) => {
    const storedData = JSON.parse(localStorage.getItem("userCourses")) || {};
    const userData = storedData[userId] || { cart: [], registered: [] };
    storedData[userId] = { ...userData, cart: updatedCart };
    localStorage.setItem("userCourses", JSON.stringify(storedData));
  };

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    const selectedTerm = currentUser?.selectedTerm || "";
    setUserTerm(selectedTerm);

    // Load existing cart for this user
    const existingCourses = loadUserCourses(currentUser.userID);
    setUserCourses(existingCourses);
    const fetchAllCourses = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_BASE}/course/auth/courses`);

        if (!response.ok) {
          throw new Error(`Error fetching courses: ${response.statusText}`);
        }

        const data = await response.json();
        return data || [];
      } catch (error) {
        console.error("Failed to fetch courses:", error);
        setError(error.message);
        return [];
      } finally {
        setLoading(false);
      }
    }

    // Fetch and filter courses by term
    fetchAllCourses().then((data) => {
      const filtered = data.filter((course) =>
        (course.term || "").toLowerCase().includes(selectedTerm.toLowerCase())
      );
      setCourses(filtered);
    });
  }, [navigate, currentUser, API_BASE]);

  const handleAdd = (courseId) => {
    if (!userCourses.includes(courseId)) {
      const updated = [...userCourses, courseId];
      setUserCourses(updated);
      saveUserCourses(currentUser.userID, updated);
      console.log(`Added course ID: ${courseId}`);
    }
  };

  const handleRemove = (courseId) => {
    const updated = userCourses.filter((id) => id !== courseId);
    setUserCourses(updated);
    saveUserCourses(currentUser.userID, updated);
    console.log(`Removed course ID: ${courseId}`);
  };

  return (
    <main style={{ padding: "2rem" }}>
      <CardComp title="Course Selection">
        {loading ? (
          <p>Loading available courses...</p>
        ) : error ? (
          <p style={{ color: "red" }}>Error: {error}</p>
        ) : courses.length === 0 ? (
          <p>
            {userTerm
              ? `No courses found for ${userTerm}.`
              : "No courses found."}
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
                key={course.courseID}
                courseCode={course.courseCode}
                name={course.CourseName}
                term={course.term}
                startEnd={course.dateRange}
                program={course.program}
                description={course.c_Description}
                onAdd={() => handleAdd(course.courseID)}
                onRemove={() => handleRemove(course.courseID)}
                isSignedIn={!!currentUser}
                isInCart={userCourses?.includes(course.courseID)}
              />
            ))}
          </>
        )}
      </CardComp>
    </main>
  );
};

export default CourseSelection;
