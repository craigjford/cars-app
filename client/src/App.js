// import logo from './logo.svg';
import {BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home"
import NavBar from "./NavBar"
import Dealers from "./features/dealers/Dealers";
import './App.css';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/nav" element={<NavBar />} />
        <Route path="/dealers" element={<Dealers />} />
        <Route exact="true" path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
