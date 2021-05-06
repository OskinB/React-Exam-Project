import React, { useState, useEffect } from "react";
import "./Frontpage.scss";
import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";
import BtnQuickAdd from "../../Btn-QuickAdd/Btn-QuickAdd";
import Search from "../../Search/Search";
import PageTotalValue from "../../Page-Total-Value/Page-Total-Value";
import { useMachine } from "@xstate/react";
import { fetchMachine } from "../../../machines/machines";
import { GET } from "../../../utilities/networking";
import { POST } from "../../../utilities/networking";
import MobileMenuBtn from "../../Mobile/Mobile-menu-btn/Mobile-menu-btn";

const Frontpage = () => {
  const useStateWithLocalStorage = (localStorageKey) => {
    const [token, setToken] = useState(
      localStorage.getItem(localStorageKey) || ""
    );
    return [token, setToken];
  };
  const [token, setToken] = useStateWithLocalStorage("token");
  const [userInfo, setUserInfo] = useState({});

  // **** API URL's have been change to placeholders. ****
  const [fetchState, sendToFetchMachine] = useMachine(fetchMachine, {
    actions: {
      fetchData: (ctx, event) => {
        fetch("api-url", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Token " + token,
          },
        })
          .then((r) => r.json())
          .then((data) => {
            sendToFetchMachine({ type: "RESOLVE", results: data });
          })
          .catch((error) => {
            console.error("Error:", error);
            sendToFetchMachine({ type: "REJECT", message: error.toString() });
          });
      },
    },
  });

  useEffect(() => {
    const getData = async () => {
      const user = await GET("user/", token);
      setUserInfo(user);
    };
    getData();
  }, []);

  const postNew = (payload) => {
    POST("items/", payload);
    sendToFetchMachine("FETCH");
  };
  const refreshData = () => {
    sendToFetchMachine("FETCH");
  }

  return (
    <div>
      <Navbar user={userInfo} />
      <Sidebar />
      <PageTotalValue content={fetchState.context.results} />
      <Search content={fetchState} refreshData={refreshData} user={userInfo} postData={postNew}/>
      <MobileMenuBtn />
      <BtnQuickAdd user={userInfo} postData={postNew}/>
    </div>
  );
};

export default Frontpage;
