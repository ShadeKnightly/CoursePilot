import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Background from "./components/Background/Background";
import Menu from "./components/Menu/Menu";
import Footer from "./components/Footer/Footer";
import CardComp from "./components/card/cardComponent";
import ClassItem from "./components/ClassItem/classItem";
import "./styles/Variables.css";

function App() {
  return (
    <Router>
      <Background>
        <Header />
        <Menu />
        <CardComp title='Test'>
          <p>TestTest</p>
          <ClassItem
            courseCode="COMP1001"
            name="Programming Fundamentals"
            term="Fall 2025"
            startEnd="Sept 5 - Dec 15"
            program="Software Development"
            description="An introduction to programming and problem solving."
            onAdd={() => alert("Added to cart!")}
            onRemove={() => alert("Removed from cart!")}
          />
        </CardComp>
        <Routes>
          <Route path="/" element={null} />
        </Routes>
        <Footer />
      </Background>
    </Router>
  );
}

export default App;
