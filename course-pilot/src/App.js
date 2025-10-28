import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Background from "./components/Background/Background";
import Menu from "./components/Menu/Menu";
import Footer from "./components/Footer/Footer";
import StudentDashboard from "./pages/Student/studentDashboard.jsx";
// import Profile from "./pages/Profile";
// import Registration from "./pages/Registration";
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
          <Route path="/dashboard" element={<StudentDashboard />} />
          {/* <Route path="/profile" element={<Profile />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/manage" element={<Manage />} />
          <Route path="/contact" element={<Contact />} /> */}
        </Routes>

        <Footer />
      </Background>
    </Router>
  );
}

export default App;
