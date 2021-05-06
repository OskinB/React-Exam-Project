import React from "react";
import { css } from "@emotion/core";

const Dot = ({ active, handleClick, i }) => (
  <span
    onClick={() => {
      handleClick(i);
    }}
    css={css`
      padding: 8px;
      margin-right: 5px;
      cursor: pointer;
      border-radius: 50%;
      background: ${active ? "#19517a" : "#f6f6f6"};
    `}
  />
);

const Dots = ({ slides, activeIndex, handleClick }) => (
  <div
    css={css`
      margin: 5rem 0 0 5rem;
      position: absolute;
      top: 2rem;
      width: 10rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    `}
  >
    {slides.map((slide, i) => (
      <Dot key={i} active={activeIndex === i} handleClick={handleClick} i={i} />
    ))}
  </div>
);

export default Dots;
