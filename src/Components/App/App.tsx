import React from 'react';
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import './App.css';

import Nav from '../Nav/Nav';
import Home from '../Home/Home';


function App() {

  return (
    <div className="App">
      <Nav></Nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Visitas" element={"Visitas"} />
        <Route path="Reservas" element={"Reservas"} />
        <Route path="Social" element={"Social"} />
      </Routes>

    </div>
  );
}

export default App;
