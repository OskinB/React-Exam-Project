import React from "react";
import "./Item-worth.scss";

const ItemWorth = ({ content }) => {

    const toCurrency = (number) => {
        const formatter = new Intl.NumberFormat("de-DE", {
            style: "decimal",
            currency: "ISK"
        });
        return formatter.format(number);
    }

    // Total Verðmæti ISK KR.
    const totalValuables = content.reduce((acc, price) => acc + parseInt(price.purchase_price), 0);

    // Total Tryggt ISK KR.
    const totalInsured = content
        .filter(insured => insured.insured)
        .reduce((acc, price) => acc + parseInt(price.purchase_price), 0);

    return (
        <div className="item-worth">
            <div className="total-value">
                <p className="font-14-regular-darkgrey">
                    Verðmæti: {content.length > 0 ? toCurrency(totalValuables) : 0} kr.</p>
                <p className="font-14-regular-darkgrey">
                    Tryggt: {content.length > 0 ? toCurrency(totalInsured) : 0} kr.</p>
            </div>
        </div>
    );
};

export default ItemWorth;