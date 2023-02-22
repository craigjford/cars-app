// import logo from './logo.svg';
import {BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect } from 'react';
import Home from "./Home"
import NavBar from "./NavBar"
import Dealers from "./features/dealers/Dealers";
import { useDispatch } from "react-redux";
import { fetchDealers } from "./features/dealers/dealersSlice";
import './App.css';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDealers())
  })

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
