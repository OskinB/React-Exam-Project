import React, { useState, useEffect } from "react";
import "./ItemCard.scss";
import insuranceIcon from "../../assets/insurance-btn-icon.svg";
import profilePic from "../../assets/sigrun.png";
import smIconCategory from "../../assets/sm-icon-category.svg";
import moment from "moment";
import "moment/locale/is";
import Comments from "../Comments/Comments";
import InputComment from "../Input-comment/Input-comment";
import { GET } from "../../utilities/networking";
import { PUT } from "../../utilities/networking";
import { DELETE } from "../../utilities/networking";

const ItemCard = ({ content, randomImg, refreshData }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const user = await GET("user/", localStorage.getItem("token"));
      setUserInfo(user);
    };
    getData();
  }, []);

  const scroll = () => {
    document.querySelector("body").style.overflow = "auto";
    setShowMenu(false);
    setShowEdit(false);
    if (refresh) {
      refreshData();
      setRefresh(false);
    }
  };

  let itemDetails = {
    name: content.name,
    brand: content.brand || "",
    description: content.description || "",
    // picture: "",
    type: content.type,
    purchase_price: content.purchase_price,
    purchase_date: content.purchase_date,
    itemQuantity: "",
    location: content.location || "",
    department: content.department,
    status: content.status,
    status_text: content.status_text,
    user: content.user,
    account: "",
    created_by_user: content.created_by_user,
    modified_by_user: null,
    internal_cost: "0",
    serial_number: null,
    local_number: null,
    mac_address: null,
    nfc_tag: null,
    account_key: "",
    home_use: false,
    barcode: null,
    insured: content.insured,
  };
  const [editItem, setEditItem] = useState(itemDetails);

  let price = editItem.purchase_price;
  const toCurrency = (number) => {
    const formatter = new Intl.NumberFormat("de-DE", {
      style: "decimal",
      currency: "ISK",
    });
    return formatter.format(number);
  };

  let datetime = editItem.purchase_date;
  moment.locale("is");
  let isDatetime = moment(datetime).format("Do MMM YY");

  // *** Dropdown ***
  const [showMenu, setShowMenu] = useState(false);
  const toggleActive = (e) => {
    setShowMenu(!showMenu);
  };

  // *** Edit item ***
  const showEditCard = () => {
    setShowMenu(false);
    setShowEdit(true);
  };

  const handleChange = (e) => {
    let value = e.target.value;
    setEditItem({
      ...editItem,
      [e.target.name]: value,
    });
  };

  const submitEdit = () => {
    setShowMenu(false);
    const changes = { ...editItem, insured: changeInsurance };
    PUT("items/" + content.id + "/", changes);
    setShowEdit(false);
    setRefresh(true);
  };

  const [changeInsurance, setChangeInsurance] = useState(editItem.insured);
  const toggleInsurance = (e) => {
    setChangeInsurance(!changeInsurance);
  };

  // *** Delete item ***
  const onConfirm = () => {
    DELETE("items/" + content.id + "/");
    setTimeout(() => {
      refreshData();
    }, 500);
    document.querySelector("body").style.overflow = "auto";
  };
  const onCancel = () => {
    window.location.href = "#" + content.id;
    setShowMenu(false);

  };
  const deleting = () => {
    setShowMenu(false);
  };
  const checkNewComment = () => {
    setRefresh(true);
  };

  const translatState = () => {
    let text = editItem.status_text;
    if (text === "in-use") {
      return "Í notkun";
    } else if (text === "in-storage") {
      return "Í geymslu";
    }
  };
  // *** Alert window ***
  const [showAlert, setShowAlert] = useState(false);
  const toggleActiveAlert = (e) => {
    setShowAlert(!showAlert);
  };

  return (
    <div id={content.id} className="modalDialog">
      {showEdit ? (
        <div className="itemcard">
          <div className="itemcard-header">
            <div className="left-column">
              {changeInsurance ? (
                <div className="item-insurance-btn" onClick={toggleInsurance}>
                  <span className="btn-text-bold-white">TRYGGT</span>
                  <img src={insuranceIcon} alt="Tryggt"></img>
                </div>
              ) : (
                <div className="cta-insurance-btn" onClick={toggleInsurance}>
                  <span className="btn-text-bold-green">TRYGGJA</span>
                  <img src={insuranceIcon} alt="Tryggja?"></img>
                </div>
              )}
            </div>
            <div className="left-column-mobile">
              <a
                href="#close"
                onClick={scroll}
                title="Loka glugga"
                className="closeCard-mobile"
              >
                <i className="bx bxs-chevron-left"></i>
              </a>
            </div>
            <div className="right-column">
              <div className="item-actions">
                <i
                  className={
                    showMenu
                      ? "active bx bx-dots-horizontal-rounded"
                      : "bx bx-dots-horizontal-rounded"
                  }
                  onClick={toggleActive}
                ></i>
                {showMenu ? (
                  <div className="menu">
                    <button type="button" className="btn-disabled">
                      Breyta búnaði
                    </button>
                    <button type="button" onClick={deleting()}>
                      Eyða búnaði
                    </button>
                  </div>
                ) : null}
              </div>
              <a
                href="#close"
                onClick={scroll}
                title="Loka glugga"
                className="closeCard"
              >
                <i className="bx bx-x"></i>
              </a>
            </div>
          </div>

          <div className="itemcard-content">
            <img src={randomImg} className="item-img" alt="Búnaður" />
            <div className="card-data">
              <input
                className="font-24-bold name-edit"
                type="text"
                name="name"
                placeholder="Skráðu inn heiti búnaðar"
                value={editItem.name}
                onChange={handleChange}
              />
              <div className="dropdown-container brand-container">
                <select
                  className="font-16-regular dropdown-btn-edit brand-edit"
                  name="brand"
                  onChange={handleChange}
                  value={editItem.brand}
                >
                  <option value="" disabled>
                    Veldu vörumerki
                  </option>
                  <option value="1caf4d70-173a-452e-b9d3-05e540f9a40a">
                    Apple
                  </option>
                  <option value="762b4290-7871-4aa4-bb03-f68a12db6bf9">
                    Lenovo
                  </option>
                  <option value="a54d50b6-3699-4914-a68a-e61417443211">
                    Samsung
                  </option>
                </select>
                <i className="bx bxs-chevron-down"></i>
              </div>
              <div className="type box">
                <span className="font-16-bold title">Flokkur</span>
                <div className="data dropdown-container ">
                  <img src={smIconCategory} alt="profile"></img>
                  <select
                    className="dropdown-btn-edit"
                    name="type"
                    onChange={handleChange}
                    value={editItem.type}
                  >
                    <option value="" disabled>
                      Veldu flokk
                    </option>
                    <option value="7465cdde-38c1-4449-819a-64fa4b0f6840">
                      Fartölvur
                    </option>
                    <option value="4ad0f7fc-a74c-430f-9766-41d7be574c47">
                      Húsgögn
                    </option>
                    <option value="788873e4-68e4-433c-a182-a5ff39bd8fd8">
                      Símar
                    </option>
                  </select>
                  <i className="bx bxs-chevron-down"></i>
                </div>
              </div>
              <div className="price box">
                <span className="font-16-bold title">Kaupverð</span>
                <input
                  className="data input-edit"
                  type="number"
                  min="0"
                  max="999999999"
                  name="purchase_price"
                  value={editItem.purchase_price}
                  onChange={handleChange}
                  placeholder="Sláðu inn verð"
                />
              </div>
              <div className="date box">
                <span className="font-16-bold title">Kaupdagur</span>
                <input
                  className="input-lg input-edit"
                  type="date"
                  name="purchase_date"
                  value={editItem.purchase_date}
                  onChange={handleChange}
                />
              </div>
              <div className="description box">
                <span className="font-16-bold title">Lýsing</span>
                <textarea
                  className="input-edit textarea-edit data"
                  name="description"
                  value={editItem.description}
                  onChange={handleChange}
                  placeholder="Sláðu inn lýsingu"
                ></textarea>
              </div>
              <div className="line"></div>
              <div className="location box">
                <span className="font-16-bold title">Staðsetning</span>
                <div className="dropdown-container">
                  <select
                    className="dropdown-btn-edit data"
                    name="location"
                    onChange={handleChange}
                    value={editItem.location}
                  >
                    <option value="" disabled>
                      Veldu staðsetningu
                    </option>
                    <option value="3f6565cc-a67f-4fbe-81c1-5e05529c3e87">
                      Borgartún 27
                    </option>
                    <option value="3f6565cc-a67f-4fbe-81c1-5e05529c3e87">
                      Háteigsvegur 33
                    </option>
                    <option value="3f6565cc-a67f-4fbe-81c1-5e05529c3e87">
                      Hringbraut 103
                    </option>
                  </select>
                  <i className="bx bxs-chevron-down"></i>
                </div>
              </div>
              <div className="department box">
                <span className="font-16-bold title">Deild</span>
                <div className="dropdown-container">
                  <select
                    className="dropdown-btn-edit data"
                    name="department"
                    onChange={handleChange}
                    value={editItem.department}
                  >
                    <option value="" disabled>
                      Veldu deild
                    </option>
                    <option value="43652413-58be-4bde-ad81-3f2a77d238ae">
                      Reon
                    </option>
                    <option value="43652413-58be-4bde-ad81-3f2a77d238ae">
                      Deild 2
                    </option>
                    <option value="43652413-58be-4bde-ad81-3f2a77d238ae">
                      Deild 3
                    </option>
                  </select>
                  <i className="bx bxs-chevron-down"></i>
                </div>
              </div>
              <div className="status box">
                <span className="font-16-bold title">Staða</span>
                <div className="dropdown-container">
                  <select
                    className="dropdown-btn-edit data"
                    name="status"
                    onChange={handleChange}
                    value={editItem.status}
                  >
                    <option value="" disabled>
                      Staða vöru
                    </option>
                    <option value="8ee7ff88-4c91-43ee-9a56-b1e7e93ebebd">
                      Í notkun
                    </option>
                    <option value="e9261d6c-35a2-4924-b4d0-91790a266263">
                      Í geymslu
                    </option>
                  </select>
                  <i className="bx bxs-chevron-down"></i>
                </div>
              </div>
              <div className="custody box">
                <span className="font-16-bold title">Í vörslu</span>
                <div className="data">
                  <img src={profilePic} alt="profile"></img>
                  <span className="font-16-regular">
                    {content.created_by_user}
                  </span>
                </div>
              </div>
              <div className="line"></div>
              <div className="more-info-btn">
                <span className="btn-text-bold-grey">
                  Ítarlegri upplýsingar
                </span>
                <i className="bx bxs-chevron-up"></i>
              </div>
              <button
                className="submit-edit-btn font-16-medium-center-white"
                type="button"
                onClick={submitEdit}
              >
                Vista breytingu
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="itemcard">
          <div className="itemcard-header">
            <div className="left-column">
              <div className={content.insured ? "item-insurance-btn" : "hide"}>
                <span className="btn-text-bold-white">TRYGGT</span>
                <img src={insuranceIcon} alt="insurance"></img>
              </div>
              <div className={content.insured ? "hide" : "cta-insurance-btn"}>
                <span className="btn-text-bold-green">TRYGGJA</span>
                <img src={insuranceIcon} alt="insurance"></img>
              </div>
            </div>
            <div className="left-column-mobile">
              <a
                href="#close"
                onClick={scroll}
                title="Loka glugga"
                className="closeCard-mobile"
              >
                <i className="bx bxs-chevron-left"></i>
              </a>
            </div>
            <div className="right-column">
              <div className="item-actions">
                <i
                  className={
                    showMenu
                      ? "active bx bx-dots-horizontal-rounded"
                      : "bx bx-dots-horizontal-rounded"
                  }
                  onClick={toggleActive}
                ></i>
                {showMenu ? (
                  <div className="menu">
                    <button
                      className="menu-dropdown-btn"
                      onClick={showEditCard}
                    >
                      Breyta búnaði
                    </button>
                    <div
                      type="button"
                      onClick={() => {
                        toggleActiveAlert();
                      }}
                      className={
                        showAlert
                          ? "active menu-dropdown-btn left"
                          : "menu-dropdown-btn left"
                      }
                    >
                      Eyða búnaði
                      {showAlert ? (
                        <div className="close-alert-slide">
                          <div className="close-alert-window">
                            <div className="alert-window-content">
                              <h3 className="font-20-bold title">
                                Eyða búnaði{" "}
                                <span className="font-20-bold">
                                  "{content.name}" ?
                                </span>
                              </h3>
                              <p className="font-16-regular-darkgrey text">
                                Þegar þú eyðir búnaði fer hann úr búnaðarskránni
                                og ekki hægt að ná upplýsingum síðar.
                              </p>
                              <div className="buttons">
                                <button
                                  className="cancel font-14-medium-darkgrey-center"
                                  onClick={onCancel}
                                >
                                  Hætta við
                                </button>
                                <button
                                  className="confirm font-14-medium-whit"
                                  onClick={onConfirm}
                                >
                                  Eyða búnað
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                ) : null}
              </div>
              <a
                href="#close"
                onClick={scroll}
                title="Loka glugga"
                className="closeCard"
              >
                <i className="bx bx-x"></i>
              </a>
            </div>
          </div>

          <div className="itemcard-content">
            <img src={randomImg} className="item-img" alt="Búnaður" />
            <div className="card-data">
              <h2 className="font-24-bold name">{editItem.name}</h2>
                
              <h3 className="font-16-regular brand">{content.brand_name === null ? "-" : content.brand_name}</h3>
              <div className="type box">
                <span className="font-16-bold title">Flokkur</span>
                <div className="data">
                  <img src={smIconCategory} alt="profile"></img>
                  <span className="font-16-regular">{content.type_name}</span>
                </div>
              </div>
              <div className="price box">
                <span className="font-16-bold title">Kaupverð</span>
                <span className="font-16-regular data">
                  {toCurrency(price)} kr
                </span>
              </div>
              <div className="date box">
                <span className="font-16-bold title">Kaupdagur</span>
                <span className="font-16-regular data">{isDatetime}</span>
              </div>
              <div className="description box">
                <span className="font-16-bold title">Lýsing</span>
                <span className="font-16-regular data">
                {editItem.description === "" ? "-" : editItem.description}
                </span>
              </div>
              <div className="line"></div>
              <div className="location box">
                <span className="font-16-bold title">Staðsetning</span>
                <span className="font-16-regular data">
                  {content.location_name === null ? "-" : content.location_name}
                </span>
              </div>
              <div className="department box">
                <span className="font-16-bold title">Deild</span>
                <span className="font-16-regular data">
                  {content.department_name}
                </span>
              </div>
              <div className="status box">
                <span className="font-16-bold title">Staða</span>
                <span className="font-16-regular data">{translatState()}</span>
              </div>
              <div className="custody box">
                <span className="font-16-bold title">Í vörslu</span>
                <div className="data">
                  <img src={profilePic} alt="profile"></img>
                  <span className="font-16-regular">
                    {content.created_by_user}
                  </span>
                </div>
              </div>
              <div className="line"></div>
              <div className="more-info-btn">
                <span className="btn-text-bold-grey">
                  Ítarlegri upplýsingar
                </span>
                <i className="bx bxs-chevron-up"></i>
              </div>
            </div>
            <div className="story-feed">
              {content.comments.length > 0 ? (
                content.comments.map((comment, i) => {
                  return <Comments key={i} content={comment} />;
                })
              ) : (
                <div></div>
              )}
              <InputComment
                content={content.id}
                user={userInfo}
                checkNewComment={checkNewComment}
              />
              <div className=""></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemCard;
