/* @flow weak */
import React from "react";
import { Link } from "react-router-dom";
import "../styles/App.sass";

export default function(props) {
  const { flag, name, capital, region, population } = props.data;
  return (
    <div className="country-card-container col-sm-2">
      <Link to={`/details?country=${name}`}>
        <div className="">
          <img className="country-card-flag" src={flag} alt="country flag" />
        </div>
      </Link>
      <div className="country-card-content">
        <Link to={`/details?country=${name}`}>
          <p className="country-card-name">{name}</p>
        </Link>
        <p className="country-card-section">
          <span className="county-card-property"> Population: </span>{" "}
          {population}
        </p>
        <p className="country-card-section">
          <span className="county-card-property"> Region: </span> {region}
        </p>
        <p className="country-card-section">
          <span className="county-card-property"> Capital: </span> {capital}
        </p>
      </div>
    </div>
  );
}
