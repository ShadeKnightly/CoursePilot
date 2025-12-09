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
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";



  // Simulate fetching courses from mock database
  const fetchAllCourses = async () => {
    try{
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE}/course/auth/courses`);

      if (!response.ok) {
        throw new Error(`Error fetching courses: ${response.statusText}`);
      }

      const data = await response.json();
      return data || [];
    }catch (error){
      console.error("Failed to fetch courses:", error);
      setError(error.message);
      return [];
    }finally {
      setLoading(false);
    }
  };
  // Fetch courses and user
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    const loadCourses = async () => {
      const data = await fetchAllCourses();
      const userTerm = currentUser?.selectedTerm || "";
      let filteredByTerm = data;

      if(userTerm){
        filteredByTerm = data.filter((course) =>
          course.term?.toLowerCase().includes(userTerm.toLowerCase())
        );
      }
      setCourses(filteredByTerm);
      setFilteredCourses(filteredByTerm);
    }
    loadCourses();
  }, [navigate, currentUser]);

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
    setCourses((prev) => prev.filter((course) => course.id !== courseId));
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
                  program={course.program}
                  description={course.c_Description}
                  onRemove={() => handleRemove(course.courseID)}
                  isSignedIn={!!currentUser} //convert null/undefined to false valid user object into true.
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
