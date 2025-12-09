import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import CardComp from "../../components/card/cardComponent";
import ClassItem from "../../components/ClassItem/classItem";

const UserCourses = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";




  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    const fetchUserCourses = async () => {
      try {
        setLoading(true);
        setError(null);
        if (!currentUser) {
          throw new Error("User not logged in");
        }

        const res = await fetch(`${API_BASE}/user/auth/${currentUser.userID}/courses`);

        if (!res.ok) {
          throw new Error(`Error fetching courses: ${res.statusText}`);
        }

        const data = await res.json();
        return data || [];
      } catch (error) {
        console.error("Failed to fetch courses:", error);
        setError(error.message);
        return [];
      } finally {
        setLoading(false);
      }
    }
    const loadCourses = async () => {
      const data = await fetchUserCourses();
      const userTerm = currentUser?.selectedTerm || "";
      let filteredByTerm = data;

      if (userTerm) {
        filteredByTerm = data.filter((course) =>
          course.term?.toLowerCase().includes(userTerm.toLowerCase())
        );
      }
      setCourses(filteredByTerm);
    };
    loadCourses();
  }, [currentUser, navigate, API_BASE]);


  const handleRemove = async (courseId) => {
    if (!window.confirm("Are you sure you want to unregister from this course?")) {
      return;
    }

    try {
      const userId = currentUser.userID;
      const res = await fetch(`${API_BASE}/user/auth/${userId}/unregister`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId: courseId }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || `Failed to unregister: ${res.status}`);
      }

      // Remove from local state
      setCourses((prev) => prev.filter((c) => c.courseID !== courseId));
      alert("Successfully unregistered from course!");
    } catch (error) {
      console.error("Error unregistering:", error);
      alert(`Failed to unregister: ${error.message}`);
    }
  };

  return (
    <main style={{ padding: "2rem" }}>
      <CardComp title={`Your Courses`}>
        {loading ? (
          <p>Loading courses...</p>
        ) : error ? (
          <p style={{ color: "red" }}>Error: {error}</p>
        ) : courses.length === 0 ? (
          <p>No courses found</p>
        ) : (
          <>
            {courses.map((course) => (
              <ClassItem
                key={course.courseID}
                courseCode={course.courseCode}
                name={course.CourseName}
                term={course.term}
                startEnd={course.dateRange}
                program={course.program}
                description={course.c_Description}
                onRemove={() => handleRemove(course.courseID)}
                isSignedIn={!!currentUser} //convert null/undefined to false valid user object into true.
              />
            ))}
          </>
        )}
      </CardComp>
    </main>
  );
};

export default UserCourses;
