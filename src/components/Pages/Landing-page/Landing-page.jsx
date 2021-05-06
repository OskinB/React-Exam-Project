import React from "react";
import "./Landing-page.scss";
import { withRouter } from "react-router-dom";
import Header from "../../Header/Header";
import HeroGreet from "./HeroGreet";
import Section1 from "./Section1";
import Slider from "./Slider/Slider";
import Slide1 from "./Slider/Slide1";
import Slide2 from "./Slider/Slide2";
import Slide3 from "./Slider/Slide3";
import Slide4 from "./Slider/Slide4";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Footer from "../../Footer/Footer";

const Landingpage = withRouter(({ history }) => {

  const images = [Slide1, Slide2, Slide3, Slide4];
  return (
    <div>
      <Header />
      <div className="container">
        <div className="toggle">
          <p className="toggled">Fyrir fyrirtæki</p>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </p>
          <p className="toggle-hover">Fyrir einstaklinga</p>
        </div>

        <HeroGreet />

        {/******** * góð yfirsýn section * **********/}

        <Section1 />

        {/******** * slideshow section * ***********/}

        <section className="slide-section">
          <Slider slides={images} />
        </section>

        {/******** * viðmót section * *************/}

        <Section2 />

        {/******** * * video section * ************/}

        <Section3 />

        <Footer />
      </div>
    </div>
  );
});

export default Landingpage;
