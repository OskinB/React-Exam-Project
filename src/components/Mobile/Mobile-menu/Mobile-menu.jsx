import React from "react";
import "./Mobile-menu.scss";
import { withRouter } from "react-router-dom";
import { useMachine } from "@xstate/react";
import { authMachine } from "../../../machines/machines";

const MobileMenu = withRouter(({ history }) => {
  const [current, send] = useMachine(authMachine);

  const showAddBtn = () => {
    document.querySelector(".btn-quickadd").style.zIndex = "999";
  };

  const logOut = () => {
    send("LOGOUT");
    history.push(current.context.newLink);
    localStorage.clear();
  };
  return (
    <div className="mobile-background" id="mobile-menu">
      <div className="mobile-menu-content">
        <a
          href="#close"
          onClick={showAddBtn}
          title="Loka glugga"
          className="close-menu"
        >
          <i className="bx bx-x"></i>
        </a>
        <ul className="menu-option">
          <li className="font-20-bold-white-center">Búnaðarskrá</li>
          <li className="font-20-bold-white-center">Pósthólf</li>
          <li className="font-20-bold-white-center">Yfirlit</li>
          <li className="font-20-bold-white-center">Stillingar</li>
          <li className="font-20-bold-white-center">Sölutorg</li>
          <li className="font-20-bold-white-center" onClick={logOut}>Útskráning</li>
        </ul>
      </div>
    </div>
  );
});

export default MobileMenu;
