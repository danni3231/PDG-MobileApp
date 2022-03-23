import * as React from "react";
import { Route, Routes, useLocation } from "react-router";
import "./App.css";

import Nav from "../Nav/Nav";
import Home from "../Home/Home";
import Reservations from "../Reservation Components/Reservations/Reservations";
import SpaceList from "../Reservation Components/SpaceList/SpaceList";
import SpaceView from "../Reservation Components/SpaceView/SpaceView";
import Visits from "../Visits Components/Visits/Visits";
import VisitForm from "../Visits Components/VisitForm/VisitForm";

import { useDispatch } from "react-redux";
import { getBookings, getSpaces, getVisits } from "../../Firebase/firebaseApi";
import Login from "../Login/Login";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getSpaces(dispatch);
    getBookings(dispatch);
    getVisits(dispatch).then(() => {
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <section className="loading">
        <section className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </section>
      </section>
    );
  } else {
    return (
      <div className="App">
        {location.pathname !== "/" ? <Nav></Nav> : ""}

        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/Inicio" element={<Home />} />

          <Route path="Visitas" element={<Visits />} />
          <Route path="Visitas/form" element={<VisitForm />} />

          <Route path="Reservas" element={<Reservations />} />
          <Route path="Reservas/list" element={<SpaceList />} />
          <Route path="Reservas/form/:id" element={<SpaceView />} />

          <Route
            path="Social"
            element={
              <div className="comingSoon">
                <h1 className="textLoading">Coming Soon...</h1>
              </div>
            }
          />
        </Routes>
      </div>
    );
  }
}

export default App;
