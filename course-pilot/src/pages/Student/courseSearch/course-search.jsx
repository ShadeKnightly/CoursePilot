import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import CardComp from "../../../components/card/cardComponent";
import ClassItem from "../../../components/ClassItem/classItem";
import SearchBox from "../../../components/Search/search";
import "./courseSearch.css";


const CourseSearch = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);

  const [courses, setCourses] = useState([]);
  const [userCourses, setUserCourses] = useState([]);
  
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const normalizeId = (id) => {
    const n = Number(id);
    return Number.isNaN(n) ? id : n;
  };

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

  // Fetch courses and user
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    const selectedTerm = currentUser?.selectedTerm || "";
    const userProgramId = currentUser?.program ? currentUser.program.toString() : "";
    const userId = currentUser?.userId || currentUser?.userID || currentUser?.id;

    // Load existing cart for this user
    setUserCourses(loadUserCourses(userId));
    
    const fetchAllCourses = async () => {
      const response = await fetch(`${API_BASE}/course/auth/courses`);
      if (!response.ok) {
        throw new Error(`Error fetching courses: ${response.statusText}`);
      }
      const data = await response.json();
      return data || [];
    };

    const fetchRegisteredCourses = async () => {
      const res = await fetch(`${API_BASE}/user/auth/${currentUser.userID}/courses`);
      if (!res.ok) throw new Error(`Error fetching registered courses: ${res.statusText}`);
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    };

    const loadCourses = async () => {
      try {
        setLoading(true);
        setError(null);

        const [allCourses, registered] = await Promise.all([
          fetchAllCourses(),
          fetchRegisteredCourses(),
        ]);

        const registeredSet = new Set(registered.map((c) => normalizeId(c.courseID)));

        const filteredByTerm = allCourses.filter((course) => {
          const termMatch = selectedTerm
            ? (course.term || "").toLowerCase().includes(selectedTerm.toLowerCase())
            : true;

          const courseProgramId = course.programID ? course.programID.toString() : "";
          const programMatch = userProgramId ? courseProgramId === userProgramId : true;

          const notRegistered = !registeredSet.has(normalizeId(course.courseID));

          return termMatch && programMatch && notRegistered;
        });

        setCourses(filteredByTerm);
        setFilteredCourses(filteredByTerm);
      } catch (err) {
        console.error("Failed to load courses:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, [navigate, currentUser, API_BASE]);

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

  // One unified filtering effect (for search + dropdown)
  useEffect(() => {
    if (!courses.length) return;

    const searchValue = searchField.toLowerCase();

    const filtered = courses.filter((course) =>
    // Search in key fields, handles undefined fields safely
    (course.courseCode?.toLowerCase().includes(searchValue) ||
      course.CourseName?.toLowerCase().includes(searchValue) ||
      course.c_Description?.toLowerCase().includes(searchValue) ||
      course.term?.toLowerCase().includes(searchValue))
    );

    setFilteredCourses(filtered);
  }, [courses, searchField]);

  // handlers
  const onSearchChange = (event) => setSearchField(event.target.value);

  const handleRemove = (courseId) => {
    console.log(`Removed course with ID: ${courseId}`);
    setCourses((prev) => prev.filter((course) => course.courseID !== courseId));
  };

  return (
    <main style={{ padding: "2rem" }}>
      <CardComp title={currentUser ? "Search Courses" : "All Courses"}>
        {loading ? (
          <p>Loading courses...</p>
        ) : error ? (
          <p style={{ color: "red" }}>Error: {error}</p>
        ) : courses.length === 0 ? (
          <p>{currentUser ? "No courses available for your term." : "No courses found."}</p>
        ) : (
          <>
            <SearchBox placeholder="Search" onChangeHandler={onSearchChange} />
            {/* Only back button if a user is signed in */}
            {currentUser && (
              <button
                className="BackToReg"
                onClick={() => navigate("/courseSelect")}
              >
                ← Back to Course Registration
              </button>
            )}
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
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
              ))
            ) : (
              <p>No courses match your search.</p>
            )}
          </>
        )}
      </CardComp>
    </main>
  );
};

export default CourseSearch;
