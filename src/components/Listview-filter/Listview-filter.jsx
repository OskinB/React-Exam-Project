import React from "react";
import "./Listview-filter.scss";

const ListviewFilter = (props) => {
  return (
    <div className="listview-filter">
      <div className="content">
        <span className="font-16-regular-grey">Nafn</span>
        <span className="font-16-regular-grey hide-mobile">Tryggt</span>
        <span className="font-16-regular-grey hide-mobile">Vörumerki</span>
        <span className="font-16-regular-grey hide-mobile">Staðsetning</span>
        <span className="font-16-regular-grey">Dags.</span>
        <span className="font-16-regular-grey">Verð</span>
      </div>
    </div>
  );
};

export default ListviewFilter;
