import React from "react";
import "./Footer.scss";
import LogoWhite from "../../assets/white-Logo.svg";

const Footer = () => {
  return (
    <div className="footer">
      <div className="left-side column">
        <div className="bb-name"></div>
        <img src={LogoWhite} alt="Logo Búnaðarbankans" />
      </div>
      <div className="flokkar">
        <div className="flokkur">
          <div className="heading-1">Um okkur</div>
          <ul>
            <li>Teymið</li>
            <li>Vinnuflæði</li>
            <li>Varan</li>
            <li>Sagan</li>
          </ul>
        </div>
        <div className="flokkur">
          <div className="heading-1">Búnaðarbankinn</div>
          <ul>
            <li>Premium áskrift</li>
            <li>Frí áskrift</li>
            <li>Vörutorg</li>
            <li>Vinnuflæði</li>
          </ul>
        </div>
        <div className="flokkur">
          <div className="heading-1">Fyrir fyrirtæki</div>
          <ul className="column">
            <li>Fyrirtækjaleiðir</li>
            <li>Teymisvinna</li>
            <li>Sala</li>
            <li>Hafa samband</li>
          </ul>
        </div>
        <div className="flokkur">
          <div className="heading-1">Samstarf</div>
          <ul className="column">
            <li>Tryggingar</li>
            <li>Viðhald</li>
            <li>Viðgerðir</li>
            <li>Samvinna</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
