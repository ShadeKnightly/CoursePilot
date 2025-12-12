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
    const userProgramId = currentUser?.program ? currentUser.program.toString() : "";
    const userId = currentUser?.userId || currentUser?.userID || currentUser?.id;
    setUserTerm(selectedTerm);

    // Load existing cart for this user
    const existingCourses = loadUserCourses(userId);
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

    const fetchRegisteredCourses = async () => {
      try {
        const res = await fetch(`${API_BASE}/user/auth/${userId}/courses`);
        if (!res.ok) throw new Error(`Error fetching registered courses: ${res.statusText}`);
        const data = await res.json();
        return Array.isArray(data) ? data : [];
      } catch (err) {
        console.error("Failed to fetch registered courses:", err);
        return [];
      }
    };

    const load = async () => {
      try {
        const [allCourses, registered] = await Promise.all([
          fetchAllCourses(),
          fetchRegisteredCourses(),
        ]);

        const registeredSet = new Set(registered.map((c) => normalizeId(c.courseID)));

        const filtered = allCourses.filter((course) => {
          const termMatch = selectedTerm
            ? (course.term || "").toLowerCase().includes(selectedTerm.toLowerCase())
            : true;

          const courseProgramId = course.programID ? course.programID.toString() : "";
          const programMatch = userProgramId ? courseProgramId === userProgramId : true;

          const notRegistered = !registeredSet.has(normalizeId(course.courseID));

          return termMatch && programMatch && notRegistered;
        });

        setCourses(filtered);
      } catch (err) {
        console.error("Failed to load courses:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [navigate, currentUser, API_BASE]);

  const normalizeId = (id) => {
    const n = Number(id);
    return Number.isNaN(n) ? id : n;
  };

  const handleAdd = (courseId) => {
    const cid = normalizeId(courseId);
    const normalized = userCourses.map(normalizeId);
    if (!normalized.includes(cid)) {
      const updated = [...new Set([...normalized, cid])];
      setUserCourses(updated);
      const userId = currentUser?.userId || currentUser?.userID || currentUser?.id;
      saveUserCourses(userId, updated);
      console.log(`Added course ID: ${cid}`);
    }
  };

  const handleRemove = (courseId) => {
    const cid = normalizeId(courseId);
    const updated = userCourses.map(normalizeId).filter((id) => id !== cid);
    setUserCourses(updated);
    const userId = currentUser?.userId || currentUser?.userID || currentUser?.id;
    saveUserCourses(userId, updated);
    console.log(`Removed course ID: ${cid}`);
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
                program={course.title}
                description={course.c_Description}
                onAdd={() => handleAdd(course.courseID)}
                onRemove={() => handleRemove(course.courseID)}
                isSignedIn={!!currentUser}
                isInCart={userCourses?.map(normalizeId).includes(normalizeId(course.courseID))}
              />
            ))}
          </>
        )}
      </CardComp>
    </main>
  );
};

export default CourseSelection;
