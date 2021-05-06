import React, { useState, useEffect } from "react";
import "./Navbar.scss";
import Profile from "../../assets/user-profile.svg";
import Logo from "../../assets/logo.svg";

const Navbar = ({ user }) => {
  let [pos, setPos] = useState(window.pageYOffset);
  let [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      let temp = window.pageYOffset;
      setVisible(pos > temp);
      setPos(temp);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <div className={"navbar" + (!visible ? "navbarHidden" : " ")}>
      <div className="left-side column">
        <img className="logo" src={Logo} alt="Logo Búnaðarbankans" />
      </div>
      <div className="right-side column">
        <h2 className="font-16-regular-darkgrey hide-mobile">
          {user.first_name}
        </h2>
        <img src={Profile} alt="Aðgangsstýring" />
        <i className="bx bx-bell bx-tada-hover"></i>
      </div>
    </div>
  );
};
export default Navbar;
