import React from "react";
import "./Mobile-menu-btn.scss";
import MobileMenu from "../Mobile-menu/Mobile-menu";

const MobileMenuBtn = () => {
  const hideAddBtn = () => {
    document.querySelector(".btn-quickadd").style.zIndex = "-1";
  };

  return (
    <div className="mobile-menu-btn">
      <a href="#mobile-menu" onClick={hideAddBtn}>
        <i className="bx bx-menu-alt-right"></i>
      </a>
      <MobileMenu />
    </div>
  );
};
export default MobileMenuBtn;
