import * as React from "react";
import Gallery from "../Gallery/Gallery";
import Header from "../Header/Header";
import { space } from "../../Types/space";

import { useDispatch, useSelector } from "react-redux";
import { getBookings, getSpaces } from "../../Redux/Actions";
import { AppState } from "../../Redux/Reducers";

interface HomeProps {}

const Home: React.FC<HomeProps> = ({}) => {
  const spaces = useSelector<AppState, AppState["spaces"]>(
    (state) => state.spaces
  );

  return (
    <article className="home">
      <Header />
      <h1>
        Hola Sr. Mejía, <br />
        ¿qué quiere hacer hoy?
      </h1>

      <Gallery
        title="Reservar un espacio"
        list={spaces}
        url={"Reservas/list"}
      />
      <div className="comingSoon">
        <h1 className="textLoading">Coming Soon...</h1>
      </div>
    </article>
  );
};
export default Home;
