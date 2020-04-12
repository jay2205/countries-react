import React, { useState, useEffect } from "react";
import Header from "./components/header";
import CountryCard from "./components/country_card";
import SearchAndFilter from "./components/search_and_filter";
import { doFetchBreifData } from "./Network/Services";
import "./styles/App.sass";

function Home() {
  const [countries, setCountries] = useState([]);
  const [showCountries, setShowCountries] = useState([]);

  async function fetchCountries() {
    const countriesArray = await doFetchBreifData();
    setCountries(countriesArray);
    setShowCountries(countriesArray);
  }

  useEffect(() => {
    if (countries.length === 0) {
      fetchCountries();
    }
  }, [countries]);

  const handleOnSearch = value => {
    const result = countries.filter(country =>
      country.name.toLowerCase().includes(value.toLowerCase()) ? country : null
    );
    setShowCountries(result);
  };

  const handleOnFilterChange = value => {
    let result = countries.filter(country =>
      country.region.toLowerCase() === value.toLowerCase() ? country : null
    );
    console.log(countries);
    console.log(result);
    result = result.length === 0 ? countries : result;
    setShowCountries(result);
  };

  return (
    <div className="App">
      <div className="App-bg">
        <Header />
        <div className="container-fluid">
          <SearchAndFilter
            onSearch={value => handleOnSearch(value)}
            onFilterChange={value => handleOnFilterChange(value)}
          />
          <div className="App-container row">
            {showCountries.length === 0
              ? null
              : showCountries.map(country => (
                  <CountryCard key={country.name} data={country} />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
