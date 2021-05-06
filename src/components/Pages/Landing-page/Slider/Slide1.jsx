import React from "react";
import slideImg1 from "../../../../assets/slide-1.svg";
const Slide1 = () => {
  return (
    <div className="slide-content">
      <div className="slide-text">
        <h1 className="font-36-bold hero-text yfirsyn-headline">
          Safnast þegar saman kemur
        </h1>
        <p>
          Fyrirtæki og stofnanir eru{" "}
          <label className="font-16-bold" htmlFor="name">
            <span>stór batterí. </span>
          </label>
          Það er erfitt að ímynda sér hve mikið þarf til að koma púsla saman
          starfseminni.
          <br />
          <br />
          Einfalda hluti eins og skrifborð, stóll, tölvubúnaður og jafnvel
          ljósin í rýminu þarf að halda til haga og gera grein fyrir{" "}
          <label className="font-16-bold" htmlFor="name">
            <span>innri kostnaði </span>
          </label>{" "}
          búnaðar.
          <br />
          <br />
          Þú færð
          <label className="font-16-bold" htmlFor="name">
            <span> heildarvirði í Búnaðarbankanum </span>
          </label>{" "}
          um leið og þú slærð inn eignir rekstursins.
        </p>
        <div className="try-free-btn btn-holder-basic">
          <div className="route hvr-sweep-to-right">
            <input
              className="btn-login-basic font-16-bold-center-white"
              value="Nánar"
            />
          </div>
        </div>
      </div>
      <div className="hero-img">
        <img src={slideImg1} alt="Greeting banner" />
      </div>
    </div>
  );
};
export default Slide1;
