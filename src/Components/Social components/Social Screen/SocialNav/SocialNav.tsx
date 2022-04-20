import * as React from "react";

import "./SocialNav.css";

interface SocialNavProps {
  activeView: "chat" | "news" | "pqr";
  handleClick: (viewClicked: "chat" | "news" | "pqr") => void;
}

const SocialNav: React.FC<SocialNavProps> = ({ activeView, handleClick }) => {
  return (
    <section className="socialNav">
      <div className="socialNav__btn" onClick={() => handleClick("chat")}>
        {activeView === "chat" ? (
          <>
            <p className="socialNav__text socialNav__text__active">Chats</p>
            <hr className="socialNav__indicator" />
          </>
        ) : (
          <p className="socialNav__text ">Chats</p>
        )}
      </div>
      <div className="socialNav__btn" onClick={() => handleClick("news")}>
        {activeView === "news" ? (
          <>
            <p className="socialNav__text socialNav__text__active">Noticias</p>
            <hr className="socialNav__indicator" />
          </>
        ) : (
          <p className="socialNav__text ">Noticias</p>
        )}
      </div>
      <div className="socialNav__btn" onClick={() => handleClick("pqr")}>
        {activeView === "pqr" ? (
          <>
            <p className="socialNav__text socialNav__text__active">PQR's</p>
            <hr className="socialNav__indicator" />
          </>
        ) : (
          <p className="socialNav__text ">PQR's</p>
        )}
      </div>
    </section>
  );
};

export default SocialNav;
