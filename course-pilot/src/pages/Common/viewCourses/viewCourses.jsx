import React, { useState, useEffect } from "react";
import CardComp from "../../../components/card/cardComponent";
import ClassItem from "../../../components/ClassItem/classItem";
import SearchBox from "../../../components/Search/search";
import "../../Student/courseSearch/courseSearch.css";



const ViewCourses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";


  // Fetch all courses once
  useEffect(() => {
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
    };
    fetchAllCourses().then((data) => {
      setCourses(data);
      setFilteredCourses(data);
    });
  }, [API_BASE]);

  // One unified filtering effect (for search + dropdown)
  useEffect(() => {
    if (!courses.length) return;

    const searchValue = searchField.toLowerCase();

    const filtered = courses.filter((course) => 
      // Search in any field, handles undefined fields 
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
       <CardComp title="All Courses">
        {loading ? (
          <p>Loading courses...</p>
        ) : error ? (
          <p style={{ color: "red" }}>Error: {error}</p>
        ) : (
          <>
            <SearchBox placeholder="Search" onChangeHandler={onSearchChange} />
       
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
                  onRemove={() => handleRemove(course.courseID)}
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

export default ViewCourses;