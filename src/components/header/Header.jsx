import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import './header.css'

const Header = () => {


    return (
        <div className="containerHeader">
            <div className="something1">
                <h1 className="title">Sorting algorithms vizualization</h1>
            </div>
            <div className="links">
                <FontAwesomeIcon icon={faCode} className = "icons" onClick={() => {window.open("https://github.com/BogdanCiornohac", "_blank");}} />
                <FontAwesomeIcon icon={faBriefcase} className = "icons"  onClick={() => {window.open("https://www.linkedin.com/in/bogdan-ciornohac-58a6b0247/", "_blank");}} />
            </div>
        </div>
    );

}

export default Header;