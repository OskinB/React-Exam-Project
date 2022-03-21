import React from "react";
import "./Landing-page.scss";
import icon1 from "../../../assets/icon1.png";
import icon2 from "../../../assets/icon2.png";
import icon3 from "../../../assets/icon3.png";
import icon4 from "../../../assets/icon4.png";

const Section1 = () => {
	return (
		<section className="yfirsyn">
			<h1 className="font-36-bold">Þú færð góða yfirsýn yfir þinn búnað</h1>
			<div className="flokkar">
				<div className="flokkur">
					<img src={icon1} alt="location icon" />
					<div className="font-24-bold-center">Staðsetning</div>
					<p>
						Hvort sem um ræðir stórt eða lítið fyrirtæki, búnaðurinn á það til
						að fara á flakk. Þá er gott að geta skrifað hjá sér minnispunkta svo
						búnaðurinn rati aftur heim.
					</p>
				</div>
				<div className="flokkur">
					<img src={icon2} alt="team icon" />
					<div className="font-24-bold-center">Teymi</div>
					<p>
						Geymslubankinn einfaldar samskipti og aðgengi að upplýsingum. Teymið
						verður virkara og samheldnara þegar það getur gengið að búnaðinum
						vísum.
					</p>
				</div>
				<div className="flokkur">
					<img src={icon3} alt="insurance icon" />
					<div className="font-24-bold-center">Tryggingar</div>
					<p>
						Það er svo margt annað sem þarf að huga að í lífinu og hafa áhyggjur
						af. Leyfðu Geymslubankanum að sjá um að tryggja búnaðinn þinn fyrir
						þig.
					</p>
				</div>
				<div className="flokkur">
					<img src={icon4} alt="wrench icon" />
					<div className="font-24-bold-center">Viðhald</div>
					<p>
						Er komið að viðhaldi á einhverjum búnaði? Veistu fyrirfram að það
						þarf að setja búnað í skoðun? Láttu kerfið sjá um að koma erindi á
						réttan stað og minnir þig á þegar komið er að viðhaldi.
					</p>
				</div>
			</div>
		</section>
	);
};
export default Section1;
