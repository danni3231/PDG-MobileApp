import * as React from "react";
import { SpacesContext } from "../../Context/spacesContext";
import Gallery from "../Gallery/Gallery";
import Header from "../Header/Header";

interface HomeProps {}

const Home: React.FC<HomeProps> = ({}) => {
  let spaces = React.useContext(SpacesContext);
  return (
    <article className="home">
      <Header />
      <h1>
        Hola Sr. Mejía, <br />
        ¿qué quiere hacer hoy?
      </h1>

      <Gallery title="Reservar un espacio" list={spaces} url={""} />
    </article>
  );
};

export default Home;
