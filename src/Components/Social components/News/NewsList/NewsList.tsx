import * as React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../../Redux/Reducers";
import NewsPreview from "../NewsPreview/NewsPreview";

import "./NewsList.css";

interface NewsListProps {}

const NewsList: React.FC<NewsListProps> = ({}) => {
  const news = useSelector<AppState, AppState["news"]>((state) => state.news);

  const [filter, setFilter] = React.useState<
    "today" | "week" | "month" | "all"
  >("today");

  const handlerFilter = (btnClicked: "today" | "week" | "month" | "all") => {
    setFilter(btnClicked);
  };

  return (
    <section className="newsList">
      <div className="newsList__nav">
        <div
          className="newsList__nav__btn"
          onClick={() => handlerFilter("today")}
        >
          {filter === "today" ? (
            <>
              <p className="newsList__nav__text newsList__nav__text__active">
                Hoy
              </p>
              <hr className="newsList__nav__indicator" />
            </>
          ) : (
            <p className="socialNav__text ">Hoy</p>
          )}
        </div>
        <div
          className="newsList__nav__btn"
          onClick={() => handlerFilter("week")}
        >
          {filter === "week" ? (
            <>
              <p className="newsList__nav__text newsList__nav__text__active">
                Semana
              </p>
              <hr className="newsList__nav__indicator" />
            </>
          ) : (
            <p className="socialNav__text ">Semana</p>
          )}
        </div>
        <div
          className="newsList__nav__btn"
          onClick={() => handlerFilter("month")}
        >
          {filter === "month" ? (
            <>
              <p className="newsList__nav__text newsList__nav__text__active">
                Mes
              </p>
              <hr className="newsList__nav__indicator" />
            </>
          ) : (
            <p className="socialNav__text ">Mes</p>
          )}
        </div>
        <div
          className="newsList__nav__btn"
          onClick={() => handlerFilter("all")}
        >
          {filter === "all" ? (
            <>
              <p className="newsList__nav__text newsList__nav__text__active">
                Todas
              </p>
              <hr className="newsList__nav__indicator" />
            </>
          ) : (
            <p className="socialNav__text ">Todas</p>
          )}
        </div>
      </div>

      <div className="scroll scroll--h newsList__scroll">
        <div className="scroll__column newsList__column">
          {news.map((news) => {
            return (
              <NewsPreview
                key={news.id}
                title={news.title}
                img={news.img}
                date={news.date}
                id={news.id}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default NewsList;
