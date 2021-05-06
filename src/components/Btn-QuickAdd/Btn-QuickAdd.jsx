import React from "react";
import "./Btn-QuickAdd.scss";
import quickAdd from "../../assets/quick-add.svg";
import AddItemForm from "../../components/AddItem-Form/AddItem-Form";

const BtnQuickAdd = ({ user, postData }) => {
  return (
    <div className="btn-quickadd">
      <a href="#add-new-item">
        <img className="addNewBtn" src={quickAdd} alt="Bæta við búnað" />
      </a>
      <AddItemForm user={user} postData={postData}/>
    </div>
  );
};

export default BtnQuickAdd;
