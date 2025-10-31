import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Background from "./components/Background/Background";
import Menu from "./components/Menu/Menu";
import Footer from "./components/Footer/Footer";
import Dashboard from "./pages/Common/Dashboard.jsx";
import Profile from "./pages/Common/Profile.jsx";
import Registration from "./pages/Student/Registration/Registration.jsx";
import CourseSelection from "./pages/Student/courseSelection.jsx";
import CourseCart from "./pages/Student/course-cart.jsx";
import CourseSearch from "./pages/Student/courseSearch/course-search.jsx";
import UserCourses from "./pages/Student/yourCourses.jsx";
import SignUp from "./pages/Guest/SignUp-LogIn/signUp.jsx";
import LogIn from "./pages/Guest/SignUp-LogIn/logIn.jsx";
// import Manage from "./pages/Manage";
// import Contact from "./pages/Contact";
import "./styles/Variables.css";

function App() {
  return (
    <Router>
      <Background>
        <Header />
        <Menu />

        <Routes>
          <Route path="/" element={null} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/courseSelect" element={<CourseSelection />} />

          <Route path="/cart" element={<CourseCart />} />
          <Route path="/search" element={<CourseSearch />} />
          <Route path="/courses" element={<UserCourses />} />


          {/* <Route path="/manage" element={<Manage />} />
          <Route path="/contact" element={<Contact />} />  */}
        </Routes>

        <Footer />
      </Background>
    </Router>
  );
}

export default App;
