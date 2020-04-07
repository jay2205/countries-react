import React, { Component } from "react";
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

export default class SearchAndFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      region: REGION_ALL
    };
    this.handleSearchOnChange = this.handleSearchOnChange.bind(this);
    this.handleOnFilterClick = this.handleOnFilterClick.bind(this);
  }

  handleSearchOnChange(e) {
    this.setState({
      inputValue: e.target.value,
      region: REGION_ALL
    });
    this.props.onSearch(e.target.value);
  }

  handleOnFilterClick(e) {
    this.setState({
      region: e.target.id
    });
    this.props.onFilterChange(e.target.id);
  }

  render() {
    const { inputValue } = this.state;
    return (
      <div className="search-container row">
        <div className="col-md-9">
          <input
            id="search"
            type="text"
            spellCheck
            value={inputValue}
            onChange={this.handleSearchOnChange}
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
                    onClick={this.handleOnFilterClick}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
            <p className="filter-region-name">Region : {this.state.region}</p>
          </div>
        </div>
      </div>
    );
  }
}
