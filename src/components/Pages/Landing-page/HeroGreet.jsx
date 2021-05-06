import React from "react";
import { withRouter } from "react-router-dom";
import Hero from "../../../assets/hero-img.svg";
import "./Landing-page.scss";

const HeroGreet = withRouter(({ history }) => {
  const logIn = () => {
    history.push("/bunadarskra");
  };
  return (
    <section className="greeting">
      <div className="cta">
        <h1 className="hero-text font-52-bold">
          Búnaðarbankinn er öflugt birgðakerfi sem hjálpar þínum rekstri
        </h1>
        <div className="try-free-btn btn-holder-basic">
          <div className="route hvr-sweep-to-right">
            <input
              className="btn-login-basic font-16-bold-center-white"
              onClick={logIn}
              value="Prufa frítt"
            />
          </div>
        </div>
      </div>
      <div className="hero-img">
        <img src={Hero} alt="Greeting banner" />
      </div>
    </section>
  );
});
export default HeroGreet;
