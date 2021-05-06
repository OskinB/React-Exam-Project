import React, { useState } from "react";
import "./Category.scss";
import moreActions from "../../assets/icon-more-actions.svg";
import catIcon from "../../assets/icon-computer.svg";
import quickAdd from "../../assets/bxs-plus-circle.svg";
import arrowRight from "../../assets/bx-arrow-right.svg";
import arrowLeft from "../../assets/bx-arrow-left.svg";
import GridviewItem from "../Gridview-item/Gridview-item";
import ListViewItem from "../Listview-item/Listview-item";
import ListviewFilter from "../Listview-filter/Listview-filter";
import ItemWorth from "../Item-worth/Item-worth";
import AddItemForm from "../AddItem-Form/AddItem-Form";
import { useMachine } from "@xstate/react";
import { Machine, assign } from "xstate";

const Category = ({
  toggle,
  content,
  keyword,
  refreshData,
  user,
  postData,
}) => {
  // *** Show only 6 items at a time in Grid View ***
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Find the index of the last image in the array
  const lastIndex = content.length - 6;

  const prevSlide = () => {
    // Check if we need to start over from the last index again
    const resetIndex = carouselIndex === 0;
    const index = resetIndex ? lastIndex : carouselIndex - 6;
    // Assign the logical index to state
    setCarouselIndex(index);
  };

  const nextSlide = () => {
    // Check if we need to start over from the first index
    const resetIndex = carouselIndex === lastIndex;
    const index = resetIndex ? 0 : carouselIndex + 6;
    // Assign the logical index to state
    setCarouselIndex(index);
  };

  // Get current image index
  const index = carouselIndex;
  // Create a new array with 6 videos from the source images
  let firstImages = content.slice(index, index + 6);

  // *** Show 5 items at first, then add 5 more in List View ***
  const perPage = 5;
  const loadDataMachine = Machine({
    id: "loadData",
    initial: "loading",
    context: {
      data: [],
    },
    states: {
      loading: {
        invoke: {
          id: "dataLoader",
          src: (context, _event) => {
            return (callback, _onEvent) => {
              const { data } = context;
              const newData = content.slice(data.length, data.length + perPage);
              const hasMore = newData.length === perPage;

              if (hasMore) {
                callback({ type: "DONE_MORE", newData });
              } else {
                callback({ type: "DONE_COMPLETE", newData });
              }
            };
          },
        },
        on: {
          DONE_MORE: {
            target: "more",
            actions: assign({
              data: ({ data }, { newData = [] }) => [...data, ...newData],
            }),
          },
          DONE_COMPLETE: {
            target: "complete",
            actions: assign({
              data: ({ data }, { newData = [] }) => [...data, ...newData],
            }),
          },
          FAIL: "failure",
        },
      },
      more: {
        on: {
          LOAD: "loading",
        },
      },
      complete: { type: "final" },
      failure: { type: "final" },
    },
  });

  const [loadState, sendloadDataMachine] = useMachine(loadDataMachine);
  const { data } = loadState.context;

  // *** Compare search input with content ***
  let searchResults = content.filter(
    (item) =>
      item.type_name.toLowerCase().includes(keyword.toLocaleLowerCase()) ||
      item.name.toLowerCase().includes(keyword.toLocaleLowerCase()) ||
      (item.bran_name &&
        item.brand_name.toLowerCase().includes(keyword.toLocaleLowerCase())) ||
      (item.description &&
        item.description.toLowerCase().includes(keyword.toLocaleLowerCase()))
  );

  // Get category info
  const typeName = content[0].type_name;
  let totalItems = content.length;

  return (
    <div className={searchResults.length === 0 ? "hide" : "category"}>
      {searchResults.length ? (
        <div className="category-header">
          <div className="category-title">
            <div className="title-left">
              <img src={catIcon} alt="Flokkur" />
              <h2 className="font-20-bold">
                {typeName}
                <span className="font-20-regular-grey"> ({totalItems}) </span>
              </h2>
            </div>
            <div className="title-right">
              <div className="more-actions">
                <img src={moreActions} alt="Meira" />
              </div>
            </div>
          </div>
          <div className="total-holder">
            <ItemWorth content={content} />
          </div>
        </div>
      ) : null}

      <div className="item-holder">
        {/* *** GRID VIEW *** */}
        {toggle === "grid" ? (
          <div className="grid-holder">
            {searchResults.length ? (
              carouselIndex > 0 ? (
                <div className="centered">
                  <img
                    src={arrowLeft}
                    className="arrow-prev"
                    onClick={prevSlide}
                    alt="Fyrri mynd"
                  />
                </div>
              ) : (
                <div className="centered">
                  <a href="#add-new-item">
                    <img
                      src={quickAdd}
                      className="add-quick"
                      alt="Bæta við búnað"
                    />
                  </a>
                </div>
              )
            ) : null}

            {content.length > 0
              ? keyword.length > 0
                ? searchResults.map((searchWord, i) => {
                    return (
                      <GridviewItem
                        key={i}
                        content={searchWord}
                        refreshData={refreshData}
                      />
                    );
                  })
                : firstImages.map((details, i) => {
                    return (
                      <GridviewItem
                        key={i}
                        content={details}
                        id={i}
                        refreshData={refreshData}
                      />
                    );
                  })
              : null}

            {toggle === "grid"
              ? searchResults.length
                ? (carouselIndex + 1 < content.length ? (
                    <div className="centered">
                      <img
                        src={arrowRight}
                        className="arrow-next"
                        onClick={nextSlide}
                        alt="Næsta mynd"
                      />
                    </div>
                  ) : null,
                  firstImages.length < 6 ||
                  firstImages.length === content.length ||
                  keyword.length > 0 ? null : (
                    <div className="centered">
                      <img
                        src={arrowRight}
                        className="arrow-next"
                        onClick={nextSlide}
                        alt="Næsta mynd"
                      />
                    </div>
                  ))
                : null
              : null}
          </div>
        ) : null}

        {/* *** LIST VIEW *** */}
        {toggle === "list" ? (
          <div className="list-holder">
            {searchResults.length ? <ListviewFilter /> : null}

            {content.length > 0
              ? keyword.length > 0
                ? searchResults.map((searchWord, i) => {
                    return (
                      <ListViewItem
                        key={i}
                        content={searchWord}
                        refreshData={refreshData}
                      />
                    );
                  })
                : data.map((itemInfo, i) => {
                    return (
                      <ListViewItem
                        key={i}
                        content={itemInfo}
                        refreshData={refreshData}
                      />
                    );
                  })
              : null}

            {loadState.matches("loading") && (
              <p className="loading-more">Loading...</p>
            )}

            {content.length > 0
              ? !keyword.length > 0
                ? loadState.matches("more") && (
                    <button
                      className="view-more font-16-bold"
                      onClick={() => {
                        sendloadDataMachine("LOAD");
                      }}
                    >
                      Sjá meira
                    </button>
                  )
                : null
              : null}
          </div>
        ) : null}
      </div>
      <AddItemForm user={user} postData={postData} />
    </div>
  );
};

export default Category;
