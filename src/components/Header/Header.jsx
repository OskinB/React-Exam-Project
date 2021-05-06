import React from "react";
import "./Header.scss";
import { withRouter } from "react-router-dom";
import Logo from "../../assets/Logo-blue.svg";

const Header = withRouter(({ history }) => {
  const logIn = () => {
    history.push("/bunadarskra");
  };

  return (
    <div className="header">
      <div className="left-side column">
        <img src={Logo} alt="Logo Búnaðarbankans" />
        <div className="header-nav-item font-16-medium-darkgrey">Fyrirtæki</div>
        <div className="header-nav-item font-16-medium-darkgrey">
          Tryggingar
        </div>
        <div className="header-nav-item font-16-medium-darkgrey">
          Áskriftarleiðir
        </div>
      </div>
      <div className="right-side column">
        <div className="header-nav-item font-16-medium-darkgrey" onClick={logIn}>
          Skrá mig inn
        </div>
        <div className="btn-holder-basic">
          <div className="route hvr-sweep-to-right">
            <input
              className="btn-login-basic font-16-bold-center-white"
              onClick={logIn}
              value="Prufa frítt"
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default Header;
