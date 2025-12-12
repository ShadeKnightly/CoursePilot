import React, { useState, useEffect } from "react";
import CardComp from "../../../components/card/cardComponent";
import ClassItem from "../../../components/ClassItem/classItem";
import SearchBox from "../../../components/Search/search";
import "../../Student/courseSearch/courseSearch.css";


const normalizeId = (id) => {
  const n = Number(id);
  return Number.isNaN(n) ? id : n;
};

const dedupeCourses = (list = []) => {
  const seen = new Set();
  return list.filter((course) => {
    const id = normalizeId(course.courseID || course.id || course.courseCode);
    if (seen.has(id)) return false;
    seen.add(id);
    return true;
  });
};



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
      const deduped = dedupeCourses(data);
      setCourses(deduped);
      setFilteredCourses(deduped);
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
    
    setFilteredCourses(dedupeCourses(filtered));
  }, [courses, searchField]);

  // handlers
  const onSearchChange = (event) => setSearchField(event.target.value);

  const handleRemove = (courseId) => {
    console.log(`Removed course with ID: ${courseId}`);
    setCourses((prev) => prev.filter((course) => normalizeId(course.courseID || course.id) !== normalizeId(courseId)));
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
                  key={course.courseID || course.id || course.courseCode}
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