import React from "react";
import "./hamburger-menu.css";

const navLinks = ["Example 1", "Example 2", "Example 3", "Example 4"];

export default function HamburgerMenu() {
  return (
    <div className="hamburger_menu">
      <input id="menu__toggle" type="checkbox" />
      <label className="menu__btn" htmlFor="menu__toggle">
        <span></span>
      </label>
      <ul className="menu__box">
        {navLinks.map((navLink, i) => (
          <li key={navLink + 1}>
            <a className="menu__item" href="#">
              {navLink}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
