import * as React from 'react';
import './Home.css';
import { space } from '../../Types/space';
import Gallery from '../Gallery/Gallery';
import Header from '../Header/Header';

interface HomeProps {

}

const Home: React.FC<HomeProps> = ({ }) => {

    const spaces: space[] = [
        {
            name: "pool",
            img: `${process.env.PUBLIC_URL}/Img/pool.png`,
            id: "0"
        }, {
            name: "pool2",
            img: `${process.env.PUBLIC_URL}/Img/pool.png`,
            id: "1"
        }, {
            name: "pool3",
            img: `${process.env.PUBLIC_URL}/Img/pool.png`,
            id: "2"
        }, {
            name: "pool4",
            img: `${process.env.PUBLIC_URL}/Img/pool.png`,
            id: "3"
        }
    ]

    return (

        <article className='home'>
            <Header />
            <h1>
                Hola Sr. Mejía, <br />
                ¿qué quiere hacer hoy?
            </h1>

            <Gallery title="Reservar un espacio" list={spaces} url={''} />

        </article>


    );
}

export default Home;