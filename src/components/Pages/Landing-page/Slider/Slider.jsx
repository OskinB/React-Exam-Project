import React, { useState, useEffect, useRef } from "react";
import { css, jsx } from "@emotion/core";
import "./Slider.scss";
import SliderContent from "./SliderContent";
import Slide from "./Slide";
import Dots from "./Dots";

/**
 * @function Slider
 */
const getWidth = () => window.innerWidth;
const Slider = (props) => {
  const [state, setState] = useState({
    activeIndex: 0,
    translate: 0,
    transition: 0.45,
  });

  const { translate, transition, activeIndex } = state;

  const goToSlide = (i) => {
    setState({
      ...state,
      activeIndex: i,
      translate: i * getWidth(),
    });
  };
  return (
    <div className="slideshow" css={SliderCSS}>
      <SliderContent
        translate={translate}
        transition={transition}
        width={getWidth() * props.slides.length}
      >
        {props.slides.map((slide, i) => (
          <Slide key={slide + i} content={slide} />
        ))}
      </SliderContent>

      <Dots
        slides={props.slides}
        activeIndex={activeIndex}
        handleClick={goToSlide}
      />
    </div>
  );
};

const SliderCSS = css`
  width: 100%;
  position: relative;
  height: 46rem;
  overflow: hidden;
  margin: 0 auto;
`;
export default Slider;
