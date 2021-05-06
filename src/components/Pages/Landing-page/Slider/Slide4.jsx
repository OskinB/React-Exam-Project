import React from "react";
import slideImg3 from "../../../../assets/slide-3.svg";
const Slide1 = () => {
  return (
    <div className="slide-content">
      <div className="slide-text">
        <h1 className="font-36-bold hero-text yfirsyn-headline">
          Komdu yfir í Búnaðarbankann
        </h1>
        <p>
          Eru gömul og þung birgðakerfi orðin þreytt? Ertu{" "}
          <label className="font-16-bold" htmlFor="name">
            <span>komin/n með nóg </span>
          </label>
          af því að taka mörg skref til að gera einfalda hluti?
          <br />
          <br />
          Viltu geta afskrifað{" "}
          <label className="font-16-bold" htmlFor="name">
            <span>afskrifað búnað, </span>
          </label>{" "}
          séð sögu búnaðarins og fært kostnað á milli á sjónrænan og
          auðskiljanlegan hátt?
          <br />
          <br />
          <br />
          Inn í Búnaðarbankann geturðu fært inn eldri bókhaldskerfi, halað inn
          excel skrám og flutt gömlu skrárnar á auðveldan hátt yfir í
          <label className="font-16-bold" htmlFor="name">
            <span> nýtt og notendavænt kerfi.</span>
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
        <img src={slideImg3} alt="Greeting banner" />
      </div>
    </div>
  );
};
export default Slide1;
