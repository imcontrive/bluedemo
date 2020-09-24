import React, { Component } from "react";
import "./header.scss";

export default class Header extends Component {
  render() {
    return (
      <>
        <div className="is-header-wrapper">
          <div className="logo_container">
            <div className="_app_logo"></div>
            <div className="logo_text"></div>
          </div>

          <div className="hamburger_menu">
            <input className="menu-btn" type="checkbox" id="menu-btn" />
            <label className="menu-icon" htmlFor="menu-btn">
              <span className="navicon"></span>
            </label>
            <ul className="menu">
              <>
                {/* <li className="user-section">
                    <a to={"/"}>Link 1</a>
                  </li> */}
                {/* <li>
                    <a to="/"> Link2</a>
                  </li> */}
              </>
              <>
                {/* <li>
                    <a to="/login">Login</a>
                  </li>
                  <li>
                    <a to="/signup">SignUp</a>
                  </li> */}
              </>
            </ul>
          </div>
        </div>
      </>
    );
  }
}
