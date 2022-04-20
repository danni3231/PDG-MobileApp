import * as React from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import "./App.css";

import Nav from "../UI/Nav/Nav";
import Home from "../Home/Home";
import Reservations from "../Reservation Components/Reservations/Reservations";
import SpaceList from "../Reservation Components/SpaceList/SpaceList";
import SpaceView from "../Reservation Components/SpaceView/SpaceView";
import Visits from "../Visits Components/Visits/Visits";
import VisitForm from "../Visits Components/VisitForm/VisitForm";
import { validateUserState } from "../../Firebase/firebaseApi";
import Login from "../User Manage Components/Login/Login";
import Register from "../User Manage Components/Register/Register";
import LoadingScreen from "../UI/loadingScreen/loadingScreen";
import { useDispatch } from "react-redux";
import SocialScreen from "../Social components/Social Screen/SocialScreen";
import NewsView from "../Social components/News/NewsView/NewsView";
import ChatView from "../Social components/Chat/ChatView/ChatView";
import ChatUserList from "../Social components/Chat/ChatUserList/ChatUserList";
import CreateUser from "../Admin Components/CreateUser/CreateUser";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    validateUserState(location.pathname, navigate, dispatch);

    window.setInterval(() => {
      setLoading(false);
    }, 5000);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  } else {
    return (
      <div className="App">
        {location.pathname === "/" ||
        location.pathname === "/Registro" ||
        location.pathname.startsWith("/Social/Chat/") ? (
          ""
        ) : (
          <Nav />
        )}

        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="Registro" element={<Register />} />

          <Route path="Inicio" element={<Home />} />

          <Route path="Visitas" element={<Visits />} />
          <Route path="Visitas/form" element={<VisitForm />} />

          <Route path="Reservas" element={<Reservations />} />
          <Route path="Reservas/list" element={<SpaceList />} />
          <Route path="Reservas/form/:id" element={<SpaceView />} />

          <Route path="Social" element={<SocialScreen />} />
          <Route path="Social/Noticias/:id" element={<NewsView />} />
          <Route path="Social/Chat/:id" element={<ChatView />} />
          <Route path="Social/AllUsers" element={<ChatUserList />} />

          <Route path="Admin/createUser" element={<CreateUser />} />
        </Routes>
      </div>
    );
  }
}

export default App;
