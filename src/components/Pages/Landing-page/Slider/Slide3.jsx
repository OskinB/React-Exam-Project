import React from "react";
import slideImg3 from "../../../../assets/slide-3.svg";
const Slide1 = () => {
	return (
		<div className="slide-content">
			<div className="slide-text">
				<h1 className="font-36-bold hero-text yfirsyn-headline">
					Góð aðgangsstýring
				</h1>
				<p>
					Í stofnunum og miðlungs- til stærri fyrirtækjum er erfitt að hafa
					yfirsýn yfir allt sem viðkemur rekstrinum. Með því að nota
					Geymslubankann geturðu
					<label className="font-16-bold" htmlFor="name">
						<span> stjórnað því hver hefur aðgang </span>
					</label>
					og umsjón með búnaðinum.
					<br />
					<br />
					<br />
					Þannig tapast síður búnaðurinn og á gagnsæjan máta er hægt að nálgast
					og fylgjast með hvar{" "}
					<label className="font-16-bold" htmlFor="name">
						<span>verðmæti fyrirtækisins </span>
					</label>{" "}
					eru niðurkomin. Betri er búnaður á skrá en týndur í skógi.
				</p>
				<div className="try-free-btn btn-holder-basic">
					<div className="route hvr-sweep-to-right">
						<input
							className="btn-login-basic font-16-bold-center-white"
							value="Nánar"
						/>
					</div>
				</div>
			</div>

			<div className="hero-img">
				<img src={slideImg3} alt="Greeting banner" />
			</div>
		</div>
	);
};
export default Slide1;
