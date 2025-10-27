import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Background from "./components/Background/Background";
import Menu from "./components/Menu/Menu";
import Footer from "./components/Footer/Footer";
import CardComp from "./components/card/cardComponent";
import "./styles/Variables.css";

function App() {
  return (
    <Router>
      <Background>
        <Header />
        <Menu />
        <CardComp title='Test'>
          <p>TestTest</p>
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
