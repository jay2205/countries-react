const BASE_URL = "https://restcountries.eu/rest/v2";
const GET_ALL = "/all";
const GET_BY_FULL_NAME = name => "/name/" + name + `?fullText=true`;
// const GET_BY_NAME = name => "/name/" + name;
// const GET_BY_CAPITAL = capital => "/capital/" + capital;
// const GET_BY_REGION = region => "/region/" + region;

const FILTER = "?fields=name;capital;population;region;flag";
const GET_ALL_BREIF = BASE_URL + GET_ALL + FILTER;

const doFetchBreifData = async function() {
  let response = await fetch(GET_ALL_BREIF);
  let jsonResponse = await response.json();
  return jsonResponse;
};

const doFetchCountryDetails = async function(country) {
  const URL = BASE_URL + GET_BY_FULL_NAME(country);
  let response = await fetch(URL);
  let jsonResponse = await response.json();
  return jsonResponse;
};

export { doFetchBreifData, doFetchCountryDetails };
