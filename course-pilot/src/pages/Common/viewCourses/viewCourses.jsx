import React, { useState, useEffect, useContext } from "react";
import CardComp from "../../../components/card/cardComponent";
import ClassItem from "../../../components/ClassItem/classItem";
import SearchBox from "../../../components/Search/search";
import "../../Student/courseSearch/courseSearch.css";

import { mockCourses } from "../../../data";


const ViewCourses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchField, setSearchField] = useState("");


 // Simulate fetching all courses
  const fetchAllCourses = () => {
    return new Promise((resolve) => {
      console.log("Fetching all available courses...");
      setTimeout(() => {
        resolve(mockCourses);
      }, 1000);
    });
  };

  // Fetch all courses once
  useEffect(() => {
    fetchAllCourses().then((data) => {
      setCourses(data);
      setFilteredCourses(data);
    });
  }, []);

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
        {courses.length === 0 ? (
          <p>Loading courses..."</p>
      ) : (
          <>
            <SearchBox placeholder="Search" onChangeHandler={onSearchChange} />
       
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