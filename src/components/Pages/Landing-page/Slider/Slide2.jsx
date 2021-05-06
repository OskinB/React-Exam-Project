import React from "react";
import slideImg2 from "../../../../assets/slide-2.svg";
const Slide1 = () => {
  return (
    <div className="slide-content">
      <div className="slide-text">
        <h1 className="font-36-bold hero-text yfirsyn-headline">
          Beinar tryggingar
        </h1>
        <p>
          Með því að skrá eignirnar þínar inn í Búnaðarbankann færðu{" "}
          <label className="font-16-bold" htmlFor="name">
            <span>heildarverðmæti fyrirtækisins </span>
          </label>
          og getur á einfaldan og fljótlegan hátt fengið tilboð í búnaðinn og
          þarft ekki að fara í gegnum allt ferlið aftur.
          <br />
          <br />
          <br />
          Með því að halda gott bókhald geturðu á öruggan hátt gengið að þínum
          verðmætum vísum og fengið{" "}
          <label className="font-16-bold" htmlFor="name">
            <span> rétt mat á rekstrarkostnað. </span>
          </label>{" "}
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
        <img src={slideImg2} alt="Greeting banner" />
      </div>
    </div>
  );
};
export default Slide1;
