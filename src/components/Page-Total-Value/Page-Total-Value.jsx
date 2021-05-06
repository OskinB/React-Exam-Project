import React from "react";
import "./Page-Total-Value.scss";
import ItemWorth from "../Item-worth/Item-worth";

const PageTotalValue = ({ content }) => {
    let totalItems = content.length;

    return (
        <div className="">
            <div className="page-title-holder">
                <h1 className="font-32-bold">
                    Minn búnaður<span className="font-32-regular-grey"> ({totalItems})</span>
                </h1>
                <ItemWorth content={content} />
            </div>
        </div>
    );
};

export default PageTotalValue;