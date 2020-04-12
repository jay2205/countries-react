import React, { useState, useEffect } from "react";
import _ from "lodash";
import queryString from "query-string";
import { doFetchCountryDetails } from "../Network/Services";
import Header from "./header";

export default function CountryDetails(props) {
  const [details, setDetails] = useState({});

  async function getCountryDetails() {
    const countryName = queryString.parse(props.location.search);
    let response = await doFetchCountryDetails(countryName.country);
    setDetails(response[0]);
  }

  useEffect(() => {
    if (_.isEmpty(details)) {
      getCountryDetails();
    }
  });

  const getLanguagesString = () => {
    const { languages } = details;
    if (languages) {
      let lang = "";
      lang += " " + languages.map(language => language.name);
      return lang;
    }
    return null;
  };

  const getBoundryCountries = () => {
    const { borders } = details;
    if (borders) {
      const borderCountries = borders.map((border, index) => {
        return (
          <button
            key={index}
            type="button"
            className="btn btn-light btn-sm btn-border"
          >
            {border}
          </button>
        );
      });
      return borderCountries.length > 0
        ? borderCountries
        : " No border countries";
    }
  };

  return (
    <div className="App">
      <div className="App-bg">
        <Header />
        <div className="back-container">
          <button
            type="button"
            className="btn btn-back"
            onClick={() => props.history.goBack()}
          >
            Back
          </button>
        </div>
        <div className="details-containter">
          <div className="row">
            <div className="col-md-6">
              <img src={details.flag} alt="flag" className="detail-img" />
            </div>
            <div className="col-md-6 details-content">
              <div>
                <p className="content-heading">{details.name}</p>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <p>
                    <span className="detail-property">Native Name: </span>
                    {details.nativeName}
                  </p>
                  <p>
                    <span className="detail-property">Population: </span>
                    {details.population}
                  </p>
                  <p>
                    <span className="detail-property">Region: </span>
                    {details.region}
                  </p>
                  <p>
                    <span className="detail-property">Sub Region: </span>
                    {details.subregion}
                  </p>
                  <p>
                    <span className="detail-property">Capital: </span>
                    {details.capital}
                  </p>
                </div>
                <div className="col-md-6">
                  <p>
                    <span className="detail-property">
                      Top Level Domain:{"  "}
                    </span>
                    {details.topLevelDomain}
                  </p>
                  <p>
                    <span className="detail-property">Currency: </span>
                    {details.currencies ? details.currencies[0].name : ""}
                  </p>
                  <p>
                    <span className="detail-property">Languaes: </span>
                    {getLanguagesString()}
                  </p>
                </div>
              </div>
              <div className="content-footer row">
                <p
                  className="detail-property"
                  style={{ margin: "0px", padding: "0px" }}
                >
                  Border Countries:{"   "}
                </p>
                {getBoundryCountries()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
