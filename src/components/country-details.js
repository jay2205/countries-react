import React from "react";
import queryString from "query-string";
import { doFetchCountryDetails } from "../Network/Services";
import Header from "./header";

export default class CountryDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {}
    };
    this.getLanguagesString = this.getLanguagesString.bind(this);
    this.getBoundryCountries = this.getBoundryCountries.bind(this);
  }

  async componentDidMount() {
    const countryName = queryString.parse(this.props.location.search);
    let response = await doFetchCountryDetails(countryName.country);
    this.setState({ details: response[0] });
  }

  getLanguagesString() {
    const { languages } = this.state.details;
    if (languages) {
      let lang = "";
      lang += " " + languages.map(language => language.name);
      return lang;
    }
    return null;
  }

  getBoundryCountries() {
    const { borders } = this.state.details;
    console.log(borders);
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
      return borderCountries;
    }
  }

  render() {
    const { details } = this.state;
    return (
      <div className="App">
        <div className="App-bg">
          <Header />
          <div className="back-container">
            <button
              type="button"
              className="btn btn-back"
              onClick={() => this.props.history.goBack()}
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
                      {this.getLanguagesString()}
                    </p>
                  </div>
                </div>
                <div className="content-footer row">
                  <p
                    className="detail-property"
                    style={{ margin: "0px", padding: "0px" }}
                  >
                    Border Countries:{" "}
                  </p>
                  {this.getBoundryCountries()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
