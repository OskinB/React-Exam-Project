import React, { useState, useEffect } from "react";
import "./Search.scss";
import Category from "../Category/Category";
import { useMachine } from "@xstate/react";
import { toggleViews } from "../../machines/machines";

const Search = ({ content, user, postData, refreshData }) => {
  const [current, send] = useMachine(toggleViews);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // *** Selected view, Grid or List, stored in LocalStorage ***
  const useStateWithLocalStorage = (localStorageKey) => {
    const [view, setView] = useState(
      localStorage.getItem(localStorageKey) || current.value
    );
    useEffect(() => {
      localStorage.setItem(localStorageKey, view);
    }, [view]);
    return [view, setView];
  };
  const [view, setView] = useStateWithLocalStorage("myView");

  // *** Filtering category names in separate arrays, along with their items. ***
  const types = [];
  let sortedType = content.context.results.reduce((r, a) => {
    if (types.indexOf(a.type_name) === -1) {
      types.push(a.type_name);
    }
    r[types.indexOf(a.type_name)] = [
      ...(r[types.indexOf(a.type_name)] || []),
      a,
    ];
    return r;
  }, []);

  return (
    <div className="search-bar">
      <div className="bar-content">
        <div className="search-input">
          <i className="bx bx-search"></i>
          <input
            onChange={handleChange}
            value={searchTerm}
            type="text"
            className="input-search"
            placeholder="Leitið og þér munuð finna"
          />
          {searchTerm === "" ? (
            null) : <i className="bx bx-x" onClick={() => setSearchTerm("")}></i>}
        </div>
        <div className="view-icons">
          <button
            onClick={() => {
              send("TOGGLE_LIST");
              setView("list");
            }}
          >
            <i className={view === "list" ? "bx bx-list-ul active" : "bx bx-list-ul"}></i>
          </button>
          <button
            onClick={() => {
              send("TOGGLE_GRID");
              setView("grid");
            }}
          >
            <i className={view === "grid" ? "bx bxs-grid active" : "bx bxs-grid"}></i>
          </button>
        </div>
      </div>

      {/* Pending state */}
      {content.value === "pending" ? (
        <div className="loading-text font-16-regular">Er að sækja gögnin þín...</div>
      ) : null}
      {/* Successful state */}
      {content.value === "successful" ? (
        sortedType.map((category, i) => {
          return <Category key={i} toggle={view} content={category} keyword={searchTerm} refreshData={refreshData} user={user} postData={postData}/>;
        })
      ) : null}
      {/* Failed state */}
      {content.value === "failed" ? (
        <div className="loading-text font-16-regular">Ekki tókst að sækja gögn.</div>
      ) : null}
    </div>
  );
};
export default Search;
