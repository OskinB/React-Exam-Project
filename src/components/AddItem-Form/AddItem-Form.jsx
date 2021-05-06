import React, { useState } from "react";
import "./AddItem-Form.scss";
import { useMachine } from "@xstate/react";
import { addItemMachine } from "../../machines/machines";
import img from "../../assets/tryggja.png";

const AddItemForm = ({ user, postData }) => {
  const [current, send] = useMachine(addItemMachine);
  const [requiredName, setRequiredName] = useState(false);
  const [requiredType, setRequiredType] = useState(false);
  const [requiredStatus, setRequiredStatus] = useState(false);
  const [requiredPrice, setRequiredPrice] = useState(false);
  const [requiredDate, setRequiredDate] = useState(false);
  const [requiredDepartment, setRequiredDepartment] = useState(false);

  let itemDetails = {
    name: "",
    brand: "",
    description: "",
    // picture: "",
    type: "",
    purchase_price: "",
    purchase_date: "",
    itemQuantity: "",
    location: "",
    department: "",
    status: "",
    user: "",
    account: "",
    created_by_user: "",
    modified_by_user: null,
    internal_cost: "0",
    serial_number: null,
    local_number: null,
    mac_address: null,
    nfc_tag: null,
    account_key: "",
    home_use: false,
    barcode: null,
    insured: false,
  };
  const [item, setItem] = useState(itemDetails);

  const handleChange = (e) => {
    let value = e.target.value;
    setItem({
      ...item,
      [e.target.name]: value,
    });
  };

  const checkStep1 = () => {
    if ((item.name || item.type) === "" || (item.name && item.type) === "") {
      if (item.name === "") {
        setRequiredName(true);
      } else {
        setRequiredName(false);
      }
      if (item.type === "") {
        setRequiredType(true);
      } else {
        setRequiredType(false);
      }
    } else {
      setRequiredName(false);
      setRequiredType(false);
      send("NEXT");
    }
  };
  const checkStep2 = () => {
    if (
      (item.status || item.purchase_price || item.purchase_date) === "" ||
      (item.status && item.purchase_price && item.purchase_date) === ""
    ) {
      if (item.status === "") {
        setRequiredStatus(true);
      } else {
        setRequiredStatus(false);
      }
      if (item.purchase_price === "") {
        setRequiredPrice(true);
      } else {
        setRequiredPrice(false);
      }
      if (item.purchase_date === "") {
        setRequiredDate(true);
      } else {
        setRequiredDate(false);
      }
    } else {
      setRequiredStatus(false);
      setRequiredPrice(false);
      setRequiredDate(false);
      send("NEXT");
    }
  };
  const checkStep3 = () => {
    if (item.department === "") {
      setRequiredDepartment(true);
    } else {
      setRequiredDepartment(false);
      send("NEXT");
    }
  };

  const postNewItem = (payload) => {
    postData(payload);
    setItem(itemDetails);
    send("START_AGAIN");
  };

  const submitNotInsured = () => {
    const payload = {
      ...item,
      user: user.id,
      created_by_user: user.username,
      insured: false,
    };
    postNewItem(payload);
  };

  const submitInsured = () => {
    const payload = {
      ...item,
      user: user.id,
      created_by_user: user.username,
      insured: true,
    };
    postNewItem(payload);
  };

  const onConfirm = () => {
    send("CLOSE");
    setItem(itemDetails);
    window.location.href = "#close";
    setRequiredName(false);
    setRequiredType(false);
    setRequiredStatus(false);
    setRequiredPrice(false);
    setRequiredDate(false);
    setRequiredDepartment(false);
  };

  const onCancel = () => {
    window.location.href = "#add-new-item";
  };

  // *** Dropdown ***
  const [showMenu, setShowMenu] = useState(false);
  const toggleActive = (e) => {
    setShowMenu(!showMenu);
  };

  return (
    <div id="add-new-item" className="modalDialog">
      <div id="add-item" className="add-item">
        <div>
          <div className="form-title">
            {!current.matches("step4") && !current.matches("closing") && (
              <h2 className="font-24-bold">Skrá nýjan búnað</h2>
            )}
          </div>
          <div className="steps">
            {current.matches("step1") && (
              <div className="step">
                <div className="line"></div>
                <div className="line-progress1"></div>
              </div>
            )}
            {current.matches("step2") && (
              <div className="step">
                <div className="line"></div>
                <div className="line-progress2"></div>
              </div>
            )}
            {current.matches("step3") && (
              <div className="step">
                <div className="line"></div>
                <div className="line-progress3"></div>
              </div>
            )}
          </div>

          <form>
            <div>
              {current.matches("step1") && (
                <div>
                  <div className="input-holder">
                    <label className="font-16-medium" htmlFor="name">
                      Heiti búnaðar{" "}
                      <span
                        className={requiredName ? "asterisk-alert" : "asterisk"}
                      >
                        *
                      </span>
                    </label>
                    <input
                      className={
                        requiredName ? "required-input input-lg" : "input-lg"
                      }
                      type="text"
                      name="name"
                      placeholder="Skráðu inn heiti búnaðar"
                      value={item.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="input-holder">
                    <label className="font-16-medium" htmlFor="brand">
                      Vörumerki
                    </label>
                    <select
                      className="dropdown-btn"
                      name="brand"
                      onChange={handleChange}
                      value={item.brand}
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
                  </div>

                  <div className="input-holder">
                    <label className="font-16-medium" htmlFor="description">
                      Lýsing
                    </label>
                    <textarea
                      className="textarea"
                      name="description"
                      value={item.description}
                      onChange={handleChange}
                      cols="30"
                      rows="4"
                      placeholder="Sláðu inn lýsingu"
                    ></textarea>
                  </div>
                  <div className="input-holder">
                    <label htmlFor="type">
                      Flokkur{" "}
                      <span
                        className={requiredType ? "asterisk-alert" : "asterisk"}
                      >
                        *
                      </span>
                    </label>
                    <select
                      className={
                        requiredType
                          ? "required-input dropdown-btn"
                          : "dropdown-btn"
                      }
                      name="type"
                      onChange={handleChange}
                      value={item.type}
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
                  </div>

                  <div className="positionAbsolute-right">
                    <div className="btn-holder-next">
                      <div className="hvr-sweep-to-right">
                        <button
                          type="button"
                          className="btn-next hvr-icon-forward"
                          onClick={checkStep1}
                        >
                          Áfram
                          <i className="bx bx-right-arrow-alt hvr-icon"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {current.matches("step2") && (
                <div>
                  <div className="input-holder">
                    <label htmlFor="status">
                      Staða{" "}
                      <span
                        className={
                          requiredStatus ? "asterisk-alert" : "asterisk"
                        }
                      >
                        *
                      </span>
                    </label>
                    <select
                      className={
                        requiredStatus
                          ? "required-input dropdown-btn"
                          : "dropdown-btn"
                      }
                      name="status"
                      onChange={handleChange}
                      value={item.status}
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
                  </div>
                  <div className="input-holder">
                    <label htmlFor="location">Staðsetning</label>
                    <select
                      className="dropdown-btn"
                      name="location"
                      onChange={handleChange}
                      value={item.location}
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
                  </div>

                  <div className="input-holder">
                    <label htmlFor="purchase_price">
                      Kaupverð{" "}
                      <span
                        className={
                          requiredPrice ? "asterisk-alert" : "asterisk"
                        }
                      >
                        *
                      </span>
                    </label>
                    <input
                      className={
                        requiredPrice ? "required-input input-sm" : "input-sm"
                      }
                      type="number"
                      min="0"
                      max="999999999"
                      name="purchase_price"
                      value={item.purchase_price}
                      onChange={handleChange}
                      placeholder="Sláðu inn verð"
                    />
                  </div>

                  <div className="input-holder">
                    <label htmlFor="purchase_date">
                      Kaupdagur{" "}
                      <span
                        className={requiredDate ? "asterisk-alert" : "asterisk"}
                      >
                        *
                      </span>
                    </label>
                    <input
                      className={
                        requiredDate ? "required-input input-lg" : "input-lg"
                      }
                      type="date"
                      name="purchase_date"
                      value={item.purchase_date}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="positionAbsolute-left">
                    <div className="btn-holder-back">
                      <button
                        className="btn-back hvr-icon-back"
                        onClick={() => {
                          send("GOBACK");
                        }}
                      >
                        <i className="bx bx-left-arrow-alt hvr-icon"></i>
                        Til Baka
                      </button>
                    </div>
                  </div>
                  <div className="positionAbsolute-right">
                    <div className="btn-holder-next">
                      <div className="hvr-sweep-to-right">
                        <button
                          type="button"
                          className="btn-next hvr-icon-forward"
                          onClick={checkStep2}
                        >
                          Áfram
                          <i className="bx bx-right-arrow-alt hvr-icon"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {current.matches("step3") && (
                <div>
                  <div className="input-holder">
                    <label className="font-16-medium" htmlFor="picture">
                      Hlaða inn mynd
                    </label>
                    <input
                      type="file"
                      name="picture"
                      placeholder="Mynd"
                      value={item.picture}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-holder">
                    <label htmlFor="department">
                      Deild{" "}
                      <span
                        className={
                          requiredDepartment ? "asterisk-alert" : "asterisk"
                        }
                      >
                        *
                      </span>
                    </label>
                    <select
                      className={
                        requiredDepartment
                          ? "required-input dropdown-btn"
                          : "dropdown-btn"
                      }
                      name="department"
                      onChange={handleChange}
                      value={item.department}
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
                  </div>
                  {/* <div className="input-holder">
                    <label htmlFor="itemQuantity">Fjöldi</label>
                    <input
                      className="input-sm"
                      type="number"
                      name="itemQuantity"
                      value={item.itemQuantity}
                      onChange={handleChange}
                      placeholder="Veldu fjölda"
                    />
                  </div> */}
                  <div className="more-option-btn">
                    <span className="btn-text-bold-primarycolor">
                      Ítarlegri upplýsingar
                    </span>
                    <i className="bx bxs-chevron-down"></i>
                  </div>

                  <div className="positionAbsolute-left">
                    <div className="btn-holder-back">
                      <button
                        className="btn-back hvr-icon-back"
                        onClick={() => {
                          send("GOBACK");
                        }}
                      >
                        <i className="bx bx-left-arrow-alt hvr-icon"></i>
                        Til Baka
                      </button>
                    </div>
                  </div>
                  <div className="positionAbsolute-right">
                    <div className="btn-holder-next">
                      <div className="hvr-sweep-to-right">
                        <button
                          className="btn-next"
                          type="button"
                          onClick={checkStep3}
                        >
                          Skrá búnað
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </form>

          {current.matches("step4") && (
            <div className="step-4">
              <h1 className="title font-24-bold-center">Skráning tókst!</h1>
              <img className="insuranceImg" src={img} alt="people" />
              <h2 className="sub-title font-16-bold-center">
                Má bjóða þér að tryggja búnaðinn?
              </h2>
              <div className="btn-container">
                <div className="btn-holder-insurance">
                  <div className="hvr-sweep-to-right-green">
                    <a
                      href="#insured"
                      className="btn-insurance"
                      onClick={submitInsured}
                    >
                      Tryggja
                    </a>
                  </div>
                </div>
                <a
                  href="#close"
                  className="btn-no-insurance"
                  onClick={submitNotInsured}
                >
                  Nei takk
                </a>
              </div>
            </div>
          )}

          {!current.matches("step4") && !current.matches("closing") && (
            <div>
              <div className="draft-btn">
                <div className="btn-text-bold-primarycolor text">GEYMA</div>
              </div>
              <div
                type="button"
                onClick={() => {
                  toggleActive();
                }}
                className={showMenu ? "active close" : "close"}
                title="Hætta við"
              >
                <i className="bx bx-x"></i>
                {showMenu ? (
                  <div className="close-alert-slide">
                    <div className="close-alert-window">
                      <div className="alert-window-content">
                        <h3 className="font-20-bold title">
                          Hætta við skráningu?
                        </h3>
                        <p className="font-16-regular-darkgrey text">
                          Gögn eru ekki vistuð ef þú lokar.
                        </p>
                        <div className="buttons">
                          <button
                            type="button"
                            className="cancel"
                            onClick={onCancel}
                          >
                            Halda áfram
                          </button>
                          <button
                            type="button"
                            className="confirm"
                            onClick={onConfirm}
                          >
                            Loka glugga
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddItemForm;
