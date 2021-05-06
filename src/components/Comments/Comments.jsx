import React from "react";
import "./Comments.scss";
import profilePic from "../../assets/sigrun.png";
import moment from "moment";
import "moment/locale/is";

const Comments = ({content}) => {
  const datetime = new Date();
  moment.locale("is");
  const isDatetime = moment(datetime).format("Do MMM YYYY");

  return (
    <div className="comment-container">
      <div className="comment-content">
        <span className="font-16-regular-grey date">{isDatetime}</span>
        <div className="user-comment">
          <img src={profilePic} alt="profile" />
          <span className="font-16-regular name">{content.owner_username}</span>
          <span className="font-16-medium text">{content.text}</span>
        </div>
      </div>
      <div className="line2"></div>
    </div>
  );
};
export default Comments;
