import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CardComp from "../../../components/card/cardComponent";
import ClassItem from "../../../components/ClassItem/classItem";
import SearchBox from "../../../components/Search/search";
import "./courseSearch.css";

const CourseSearch = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchField, setSearchField] = useState("");

  // Simulate fetching courses from mock database
  const fetchAllCourses = () => {
    return new Promise((resolve) => {
      console.log("Fetching all available courses...");
      setTimeout(() => {
        const mockDatabase = [
          {
            id: 1,
            courseCode: "COMP101",
            name: "Intro to Programming",
            term: "Fall 2025",
            startEnd: "Sept 1 - Dec 15",
            program: "Software Development",
            description:
              "Learn the basics of programming in C# and problem solving.",
          },
          {
            id: 2,
            courseCode: "WEB201",
            name: "Web Development",
            term: "Winter 2026",
            startEnd: "Jan 5 - Mar 30",
            program: "Software Development",
            description:
              "Covers HTML, CSS, JavaScript, and modern frameworks.",
          },
          {
            id: 3,
            courseCode: "DBS301",
            name: "Database Systems",
            term: "Fall 2025",
            startEnd: "Sept 1 - Dec 15",
            program: "Software Development",
            description:
              "Introduction to SQL, relational databases, and data modeling.",
          },
          {
            id: 4,
            courseCode: "NET202",
            name: "Networking Fundamentals",
            term: "Winter 2026",
            startEnd: "Jan 5 - Mar 30",
            program: "Information Technology",
            description:
              "Learn the fundamentals of networking, protocols, and security.",
          },
          {
            id: 5,
            courseCode: "SEC310",
            name: "Cybersecurity Basics",
            term: "Summer 2026",
            startEnd: "Jun 5 - Aug 20",
            program: "Information Technology",
            description:
              "Covers essential cybersecurity concepts including encryption, firewalls, and ethical hacking.",
          },
          {
            id: 6,
            courseCode: "AI401",
            name: "Introduction to Artificial Intelligence",
            term: "Fall 2025",
            startEnd: "Sept 1 - Dec 15",
            program: "Computer Science",
            description:
              "An overview of AI fundamentals, including search algorithms, logic, and basic machine learning.",
          },
          {
            id: 7,
            courseCode: "MOB210",
            name: "Mobile App Development",
            term: "Spring 2026",
            startEnd: "Mar 1 - Jun 15",
            program: "Software Development",
            description:
              "Build mobile apps using cross-platform technologies like React Native.",
          },
          {
            id: 8,
            courseCode: "UIX220",
            name: "UI/UX Design Principles",
            term: "Winter 2026",
            startEnd: "Jan 5 - Mar 30",
            program: "Software Development",
            description:
              "Learn modern user interface and user experience design fundamentals.",
          },
          {
            id: 9,
            courseCode: "DAT405",
            name: "Data Analytics",
            term: "Spring 2026",
            startEnd: "Mar 1 - Jun 15",
            program: "Computer Science",
            description:
              "Explore data cleaning, visualization, and basic statistical analysis using Python.",
          },
          {
            id: 10,
            courseCode: "CLD350",
            name: "Cloud Computing",
            term: "Summer 2026",
            startEnd: "Jun 5 - Aug 20",
            program: "Information Technology",
            description:
              "Introduction to cloud architecture, virtualization, and deployment models (AWS, Azure).",
          },
          {
            id: 11,
            courseCode: "PRJ400",
            name: "Capstone Project",
            term: "Fall 2026",
            startEnd: "Sept 1 - Dec 15",
            program: "Software Development",
            description:
            "Apply all learned skills in a team-based final project with real-world clients.",
          },
          {
            id: 12,
            courseCode: "OS205",
            name: "Operating Systems Concepts",
            term: "Spring 2026",
            startEnd: "Mar 1 - Jun 15",
            program: "Information Technology",
            description:
            "Understand the principles of modern operating systems including memory management and scheduling.",
          },
        ];
        resolve(mockDatabase);
      }, 1000);
    });
  };
  
  // Fetch courses and user
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      navigate("/signin");
      return;
    }
    const userTerm = currentUser?.selectedTerm || ""; // example: "Fall 2025"

    fetchAllCourses().then((data) => {
      // Filter by user term immediately
      const filteredByTerm = data.filter((course) => course.term.toLowerCase().includes(userTerm.toLowerCase())
      );
      setCourses(filteredByTerm);
      setFilteredCourses(filteredByTerm);
    });
  }, [navigate]);

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
      <CardComp title="Search Courses">
        {courses.length === 0 ? (
          <p>Loading your courses...</p>
        ) : (
          <>
            <SearchBox placeholder="Search" onChangeHandler={onSearchChange} />
            <button className="BackToReg" onClick={() => navigate("/courseSelect")}>
              ← Back to Course Registration
            </button>

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

export default CourseSearch;
