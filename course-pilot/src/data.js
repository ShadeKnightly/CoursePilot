// Courses
export const mockCourses = [
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

// Users
export const users = [
  {
    id: 1,
    firstName: "addy",
    lastName: "min",
    email: "addy@email.com",
    phone: "4038764325",
    birthday: "2002-09-01",
    username: "admin",
    password: "admin123",
    role: "admin",
  },
  {
    id: 2,
    firstName: "Guy",
    lastName: "Dude",
    email: "realEmail@email.com",
    phone: "9876543210",
    birthday: "2000-05-23",
    department: "Software Development",
    program: "Diploma",
    username: "student1",
    password: "password",
    role: "student",
  },
];

// Admin Messages
export const mockMessages = [
  {
    id: 1,
    sender: `${users[1].firstName} ${users[1].lastName}`,
    email: users[1].email,
    subject: "Question about COMP101",
    message: `Hi, I wanted to ask if there are any prerequisites for ${mockCourses[0].name}?`,
    date: "2025-11-01",
    read: false,
  },
  {
    id: 2,
    sender: "Alice Johnson",
    email: "alice@example.com",
    subject: "Registration Issue",
    message: `I tried registering for ${mockCourses[1].name}, but it says full. Can you help?`,
    date: "2025-11-02",
    read: true,
  },
  {
    id: 3,
    sender: "John Doe",
    email: "john@example.com",
    subject: "Feedback on Database Systems",
    message: `The ${mockCourses[2].name} course is really helpful! Thank you for the materials.`,
    date: "2025-11-02",
    read: false,
  },
  {
    id: 4,
    sender: "Emily Parker",
    email: "emily@example.com",
    subject: "Course Content Inquiry",
    message: `Can you provide more details on what we will cover in ${mockCourses[5].name}?`,
    date: "2025-11-03",
    read: false,
  },
  {
    id: 5,
    sender: `${users[1].firstName} ${users[1].lastName}`,
    email: users[1].email,
    subject: "UI/UX Design Help",
    message: `I am struggling with the project for ${mockCourses[7].name}. Can I schedule a meeting with the instructor?`,
    date: "2025-11-04",
    read: true,
  },
];
