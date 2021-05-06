import React, { useState, useEffect } from "react";
import "./Login.scss";
import logo from "../../../assets/logo.svg";
import { withRouter } from "react-router-dom";
import { useMachine } from "@xstate/react";
import { authMachine } from "../../../machines/machines";
import { POST } from "../../../utilities/networking";

const Login = withRouter(({ history }) => {
  const [current, send] = useMachine(authMachine);

  const [signIn, setSignIn] = useState({
    username: "",
    password: "",
  });

  const [remember, setRemember] = useState(false);
  const toggleRemember = e => {
    setRemember(!remember);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSignIn({
      ...signIn,
      [e.target.name]: value,
    });
  };

  // *** Remember check stored in LocalStorage ***
  const useStateWithLocalStorage = (localStorageKey) => {
    const [token, setToken] = useState(
      localStorage.getItem(localStorageKey) || ""
    );
    useEffect(() => {
      localStorage.setItem(localStorageKey, token);
    }, [token]);
    return [token, setToken];
  };
  const [token, setToken] = useStateWithLocalStorage("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (signIn.username === "" && signIn.password === "") {
      send({
        type: "LOGIN_EMPTY",
        errorMessage: "Vinsamlegast fylltu inn netfang og lykilorð",
      });
    } else {
      const response = await POST("api-token-auth/", signIn);
      if (response.token) {
        setToken(response.token);
        send({ type: "LOGIN_SUCCESS", response });
      } else if (!response.token) {
        send({
          type: "LOGIN_ERROR",
          errorMessage: "Ekki tókst að skrá þig inn",
        });
      }
    }
  };
  useEffect(() => {
    history.push(current.context.newLink);
  }, [current.context.newLink]);

  return (
    <div className="container">
      <div className="nav-logo">
        <img src={logo} alt="Búnaðarbankinn" />
      </div>
      <div className="login">
        <div className="page-title">
          <h1>Innskráning</h1>
        </div>

        <form action="" onSubmit={handleSubmit}>
          <div className="input-holder font-16-medium">
            <label htmlFor="username">Netfang <span className={current.event.type === 'LOGIN_EMPTY' ? "asterisk-alert" : "asterisk"}>*</span></label>
            <input
              className={current.event.type === 'LOGIN_EMPTY' ? "required-input" : ""}
              type="text"
              name="username"
              value={signIn.username}
              onChange={handleChange}
              placeholder={
                current.event.type === "LOGIN_EMPTY"
                  ? "Vinsamlegast fylltu inn netfang"
                  : "Sláðu inn netfang"
              }
            />
            <label htmlFor="password">Lykilorð <span className={current.event.type === 'LOGIN_EMPTY' ? "asterisk-alert" : "asterisk"}>*</span></label>
            <input
              className={current.event.type === 'LOGIN_EMPTY' ? "required-input" : ""}
              type="password"
              name="password"
              value={signIn.password}
              onChange={handleChange}
              placeholder={
                current.event.type === "LOGIN_EMPTY"
                  ? "Vinsamlegast fylltu inn lykilorð"
                  : "Sláðu inn netfang"
              }
            />
          </div>
          <div className="remember-holder">
            <input type="checkbox" onClick={toggleRemember} />
            <p>Muna eftir mér</p>
          </div>
          <div className="login-error-holder">
            {current.event.type === "LOGIN_ERROR" ? (
              <div className="login-error-text">
                <p>{current.context.errorMessage}</p>
              </div>
            ) : null}
          </div>
          <div className="btn-holder">
            <div className="route hvr-sweep-to-right font-16-bold-center-white">
              <input
                className="btn-login"
                type="submit"
                onClick={() => {
                  send("LOGIN");
                }}
                value="Skrá mig inn"
              />
            </div>
          </div>
        </form>
        <div className="forgotten-pw">
          <p>Gleymt lykilorð?</p>
        </div>
      </div>
    </div>
  );
});

export default Login;
