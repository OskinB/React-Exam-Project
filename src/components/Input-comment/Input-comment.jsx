import React, { useState } from "react";
import "./Input-comment.scss";
import profilePic from "../../assets/sigrun.png";
import { POST } from "../../utilities/networking";

const InputComments = ({ content, user, checkNewComment }) => {

  const [comment, setComment] = useState({
    item: content,
    text: "",
    owner: user.id,
    account: user.account,
  });
  const handleChange = (e) => {
    const value = e.target.value;
    setComment({
      ...comment,
      [e.target.name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...comment,
      item: content,
      owner: user.id,
      account: user.account,
    };
    POST("comments/", payload);
    setComment({
      item: content,
      text: "",
      owner: user.id,
      account: user.account,
    });
    checkNewComment();
  };

  return (
    <div className="input-comment-container">
      <div className="comment-content">
        <form onSubmit={handleSubmit}>
          <div className="form-content">
            <img src={profilePic} alt="profile"></img>
            <input
              className="input-comment"
              type="text"
              name="text"
              placeholder="Skráðu niður athugasemd"
              value={comment.text}
              onChange={handleChange}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
export default InputComments;
