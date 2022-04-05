import * as React from "react";
import Gallery from "../UI/Gallery/Gallery";
import Header from "../UI/Header/Header";

import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../Redux/Reducers";
import {
  getBookings,
  getSpaces,
  getVisits,
  validateUserState,
} from "../../Firebase/firebaseApi";
import { useNavigate } from "react-router";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const spaces = useSelector<AppState, AppState["spaces"]>(
    (state) => state.spaces
  );

  const user = useSelector<AppState, AppState["user"]>((state) => state.user);

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    validateUserState(navigate);
    getSpaces(dispatch);
    getBookings(dispatch);
    getVisits(dispatch).then(() => {
      setLoading(false);
    });

    console.log(user);
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
      <article className="home">
        <Header />
        <h1>
          Hola Sr. {`${user.firstname} ${user.lastname}`}, <br />
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
  }
};
export default Home;
