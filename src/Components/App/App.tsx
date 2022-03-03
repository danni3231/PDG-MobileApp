import * as React from "react";
import { Route, Routes } from "react-router";
import "./App.css";

import Nav from "../Nav/Nav";
import Home from "../Home/Home";
import Reservations from "../Reservation Components/Reservations/Reservations";
import SpaceList from "../Reservation Components/SpaceList/SpaceList";
import { SpacesContext } from "../../Context/spacesContext";
import SpaceView from "../Reservation Components/SpaceView/SpaceView";

function App() {
  const reservations: any[] = [];
  let spaces = React.useContext(SpacesContext);

  return (
    <div className="App">
      <Nav></Nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Visitas" element={"Visitas"} />
        <Route
          path="Reservas"
          element={<Reservations reservations={reservations} />}
        />
        <Route path="Reservas/list" element={<SpaceList />} />
        <Route path="Reservas/form" element={<SpaceView />} />
        <Route path="Social" element={"Social"} />
      </Routes>
    </div>
  );
}

export default App;
