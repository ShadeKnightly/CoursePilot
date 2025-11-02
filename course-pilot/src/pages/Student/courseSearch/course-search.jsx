import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import CardComp from "../../../components/card/cardComponent";
import ClassItem from "../../../components/ClassItem/classItem";
import SearchBox from "../../../components/Search/search";
import "./courseSearch.css";
import { mockCourses } from "../../../data";


const CourseSearch = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);

  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchField, setSearchField] = useState("");


  // Simulate fetching courses from mock database
  const fetchAllCourses = () => {
    return new Promise((resolve) => {
      console.log("Fetching all available courses...");
      setTimeout(() => {
        resolve(mockCourses);
      }, 1000);
    });
  };
  // Fetch courses and user
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    const userTerm = currentUser?.selectedTerm || "";

    fetchAllCourses().then((data) => {
      // Filter by user term immediately
      const filteredByTerm = data.filter((course) => course.term.toLowerCase().includes(userTerm.toLowerCase())
      );
      setCourses(filteredByTerm);
      setFilteredCourses(filteredByTerm);
    });
  }, [navigate, currentUser]);

  // One unified filtering effect (for search + dropdown)
  useEffect(() => {
    if (!courses.length) return;

    const searchValue = searchField.toLowerCase();

    const filtered = courses.filter((course) => 
      // Search in any field, handles undefined fields safely
      Object.values(course).join(" ").toLowerCase().includes(searchValue)
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
        {courses.length === 0 ? (
          <p>{currentUser ? "Loading your courses..." : "Loading courses..."}</p>
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
