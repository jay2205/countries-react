import React from "react";
import { faMoon } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/App.sass";

export default function() {
  return (
    <header className="App-header">
      <p className="App-heading"> Where in the World ? </p>
      <div className="Heading-right">
        <FontAwesomeIcon icon={faMoon} />
        <p className="App-sub-heading">Dark Mode</p>
      </div>
    </header>
  );
}
