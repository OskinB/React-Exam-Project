import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import "./Sidebar.scss";
import closedArrow from "../../assets/closed-arrow.png";
import { useMachine } from "@xstate/react";
import { authMachine } from "../../machines/machines";

const Sidebar = withRouter(({ history }) => {
  const [active, setActive] = useState(false);
  const toggleActive = (e) => setActive(!active);
  const [current, send] = useMachine(authMachine);

  const logOut = () => {
    send("LOGOUT");
    history.push(current.context.newLink);
    localStorage.clear();
  };

  return (
    <div className={active ? "active sidebar" : "sidebar"}>
      <div className="toggle-btn" onClick={toggleActive}>
        <img
          src={closedArrow}
          className={active ? "rotated" : ""}
          alt="open sidebar"
        />
      </div>
      <div className={active ? "active" : ""}>
        <ul className="font-20-bold-white">
          <li>Búnaðarskrá</li>
          <li>Pósthólf</li>
          <li>Pokahornið</li>
          <li>Yfirlit</li>
          <li>Sölutorg</li>
          <li>Stillingar</li>
          <li onClick={logOut}>Útskráning</li>
        </ul>
      </div>
    </div>
  );
});

export default Sidebar;
