import React from "react";
import "./Landing-page.scss";
import mediaContent from "../../../assets/mediaContent.png";

const Section2 = () => {
  return (
    <section className="vidmot">
      <div className="vidmot-content">
        <div className="media-img">
          <img src={mediaContent} alt="Example screenshot" />
        </div>
        <div className="vidmot-texti flokkar">
          <div className="font-24-bold">Öflugt viðmót</div>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy.
          </p>
          <div className="font-24-bold">Samskipti milli teyma</div>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy.
          </p>
        </div>
      </div>
    </section>
  );
};
export default Section2;
