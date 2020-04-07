import React, { Component } from "react";
import Header from "./components/header";
import CountryCard from "./components/country_card";
import SearchAndFilter from "./components/search_and_filter";
import { doFetchBreifData } from "./Network/Services";
import "./styles/App.sass";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      searchCountried: [],
      showCountries: []
    };
    this.handleOnSearch = this.handleOnSearch.bind(this);
    this.handleOnFilterChange = this.handleOnFilterChange.bind(this);
  }

  async componentDidMount() {
    const countries = await doFetchBreifData();
    this.setState({ countries, showCountries: countries });
  }

  handleOnSearch(value) {
    const { countries } = this.state;
    const result = countries.filter(country =>
      country.name.toLowerCase().includes(value.toLowerCase()) ? country : null
    );
    this.setState({
      showCountries: result
    });
  }

  handleOnFilterChange(value) {
    const { countries } = this.state;
    let result = countries.filter(country =>
      country.region.toLowerCase() === value.toLowerCase() ? country : null
    );
    result = result.length === 0 ? countries : result;
    this.setState({
      showCountries: result
    });
  }

  render() {
    const { showCountries } = this.state;
    return (
      <div className="App">
        <div className="App-bg">
          <Header />
          <div className="container-fluid">
            <SearchAndFilter
              onSearch={this.handleOnSearch}
              onFilterChange={this.handleOnFilterChange}
            />
            <div className="App-container row">
              {showCountries.map(country => (
                <CountryCard key={country.name} data={country} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
