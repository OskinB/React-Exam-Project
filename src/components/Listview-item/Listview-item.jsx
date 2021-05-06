import React from "react";
import "./Listview-item.scss";
import insuranceStroke from "../../assets/icon-insurance-stroke.svg";
import moment from "moment";
import "moment/locale/is";
import ItemCard from "../ItemCard/ItemCard";

const ListViewItem = ({content, postComment, editItem, deleteItem, refreshData}) => {
  let datetime = content.purchase_date;
  moment.locale("is");
  let isDatetime = moment(datetime).format("Do MMM YYYY");
  let price = content.purchase_price;

  const toCurrency = (number) => {
    const formatter = new Intl.NumberFormat("de-DE", {
      style: "decimal",
      currency: "ISK",
    });
    return formatter.format(number);
  };

  const noScroll = () => {
    document.querySelector("body").style.overflow = "hidden";
  };
  let randomImg =
    "https://picsum.photos/id/" +
    (parseInt(content.id.substring(0, 3), 16) % 100) +
    "/280/280?random=1";

  return (
    <div className="listview-item">
      <a href={"#" + content.id} onClick={noScroll}>
        <div className="item-content">
          <span className="font-16-regular name">{content.name}</span>
          <div className="insurance hide-mobile">
            <img
              src={insuranceStroke}
              className={content.insured ? "item-insurance" : "hide"}
              alt="Trygging"
            />
          </div>
          <span className="font-16-regular hide-mobile">
          {content.brand_name === null ? "-" : content.brand_name}
          </span>
          <span className="font-16-regular hide-mobile">
          {content.location_name === null ? "-" : content.location_name}
          </span>
          <span className="font-16-regular date">{isDatetime}</span>
          <span className="font-16-regular price">{toCurrency(price)} kr</span>
          <div className="more-icon hide-mobile">
            <i className="bx bx-dots-horizontal-rounded"></i>
          </div>
        </div>
      </a>
      <ItemCard content={content} randomImg={randomImg} refreshData={refreshData}/>
    </div>
  );
};

export default ListViewItem;
