import React from "react";
import "./Gridview-item.scss";
import insuranceStroke from "../../assets/icon-insurance-stroke.svg";
import ItemCard from "../ItemCard/ItemCard";

const GridViewItem = ({id, content, postComment, editItem, deleteItem, refreshData}) => {
  const noScroll = () => {
    document.querySelector("body").style.overflow = "hidden";
  };

  let randomImg = "https://picsum.photos/id/" + (parseInt(content.id.substring(0, 3), 16) % 100) + "/280/280?random=1";

  return (
    <div className="category-item">
      <div className="item">
        <a href={"#" + content.id} onClick={noScroll}>
          <img
            src={randomImg}
            className="item-img"
            alt="Búnaður"
          />
          <img
            src={insuranceStroke}
            className={content.insured ? "item-insurance" : "hide"}
            alt="Trygging"
          />
          <div className="item-text">
            <p className="font-14-medium-darkgrey-center">{content.name}</p>
            <p></p>
          </div>
        </a>
      </div>
      <ItemCard key={id} content={content} randomImg={randomImg} refreshData={refreshData} />
    </div>
  );
};

export default GridViewItem;
