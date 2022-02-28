import * as React from "react";
import Gallery from "../Gallery/Gallery";
import Header from "../Header/Header";
import { space } from "../../Types/space";

//firebase

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Firebase/firebaseConfig";

interface HomeProps {}

const Home: React.FC<HomeProps> = ({}) => {
  //let spaces = React.useContext(SpacesContext);

  const [spaces, setSpaces] = React.useState<space[]>([]);

  React.useEffect(() => {
    const getData = async () => {
      const datos = await getDocs(
        collection(db, "condominiums/q4CPmR9IIHrA6k1H2SdS/spaces")
      );

      datos.forEach((e) => {
        console.log(e.data());

        let newSpace: space = {
          name: e.data().name,
          img: e.data().img,
          id: e.id,
        };

        setSpaces([...spaces, newSpace]);
      });

      /*
      datos.docs.map((e) => {
        let newSpace: space = {
          name: e.data().name,
          id: e.id,
          img: e.data().img,
        };

        setSpaces([...spaces, newSpace]);
      });
      */
    };

    getData();
  }, []);

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
