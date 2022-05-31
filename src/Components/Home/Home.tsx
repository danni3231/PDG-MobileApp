import * as React from "react";
import Gallery from "../UI/Gallery/Gallery";
import Header from "../UI/Header/Header";

import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../Redux/Reducers";
import { useNavigate } from "react-router";
import "../Home/Home.css";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const spaces = useSelector<AppState, AppState["spaces"]>(
    (state) => state.spaces
  );

  const news = useSelector<AppState, AppState["news"]>((state) => state.news);

  const currentUser = useSelector<AppState, AppState["currentUser"]>(
    (state) => state.currentUser
  );

  return (
    <article className="home">
      <Header />

      <h1>
        Hola {`${currentUser.firstname} ${currentUser.lastname}`}, <br />
        ¿Qué quieres hacer hoy?
      </h1>

      <div className="scroll scroll--h">
        <div className="scroll__column home__column">
          <Gallery
            title="Reservar un espacio"
            listSpace={spaces}
            url={"/Reservas/list"}
          />

          <Gallery title="Noticias" listNews={news} url={"/Social"} isNotice />
        </div>
      </div>
    </article>
  );
};
export default Home;
