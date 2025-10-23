import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import "./styles/Variables.css";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={null} />
      </Routes>
    </Router>
  );
}

export default App;
