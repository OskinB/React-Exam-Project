import React from "react";
import "./Landing-page.scss";
import ReactPlayer from "react-player";
import demo from "../../../assets/GB-Demo.mp4";

const Section3 = () => {
	return (
		<section className="video-section">
			<div className="video-text">
				<h1 className="headline font-36-bold">
					Sjáðu hvernig
					<br /> Geymslubankinn virkar
				</h1>
				<p className="font-18-regular-grey">
					Þægilegt viðmót og auðvelt í notkun
				</p>
				<div className="videoplayer">
					<ReactPlayer playing loop controls url={demo} />
				</div>
			</div>
		</section>
	);
};
export default Section3;
