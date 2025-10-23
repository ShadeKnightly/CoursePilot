import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Background from "./components/Background/Background";
import "./styles/Variables.css";

function App() {
  return (
    <Router>
      <Background>
      <Header />
      <Routes>
        <Route path="/" element={null} />
      </Routes>
      </Background>
    </Router>
  );
}

export default App;
