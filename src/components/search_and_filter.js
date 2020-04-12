import React, { useState } from "react";
import "../styles/App.sass";

const REGION_EU = "Europe";
const REGION_AS = "Asia";
const REGION_AM = "Americas";
const REGION_AF = "Africa";
const REGION_OC = "Oceania";
const REGION_ALL = "All";

const dropdownMenu = [
  REGION_ALL,
  REGION_AF,
  REGION_AM,
  REGION_AS,
  REGION_EU,
  REGION_OC
];

export default function SearchAndFilter(props) {
  const [inputValue, setInputValue] = useState("");
  const [region, setRegion] = useState(REGION_ALL);

  function handleSearchOnChange(e) {
    setInputValue(e.target.value);
    setRegion(REGION_ALL);
    props.onSearch(e.target.value);
  }

  function handleOnFilterClick(e) {
    setRegion(e.target.id);
    props.onFilterChange(e.target.id);
  }

  return (
    <div className="search-container row">
      <div className="col-md-9">
        <input
          id="search"
          type="text"
          spellCheck
          value={inputValue}
          onChange={e => handleSearchOnChange(e)}
          className="search-input"
          placeholder="Search for country"
          size="50"
        />
      </div>
      <div className="col-md-3 filter">
        <div className="dropdown filter-background">
          <button
            className="btn dropdown-toggle"
            type="button"
            id="dropdownMenu2"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Filter by region
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
            {dropdownMenu.map((item, index) => {
              return (
                <button
                  key={index}
                  id={item}
                  className="dropdown-item"
                  type="button"
                  onClick={e => handleOnFilterClick(e)}
                >
                  {item}
                </button>
              );
            })}
          </div>
          <p className="filter-region-name">Region : {region}</p>
        </div>
      </div>
    </div>
  );
}
