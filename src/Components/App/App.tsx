import React from 'react';
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import './App.css';

import Nav from '../Nav/Nav';


function App() {

  return (
    <div className="App">
      <Nav></Nav>

      <Routes>
        <Route path="/" element={"home"} />
        <Route path="Visitas" element={"Visitas"} />
        <Route path="Reservas" element={"Reservas"} />
        <Route path="Social" element={"Social"} />
      </Routes>

    </div>
  );
}

export default App;
