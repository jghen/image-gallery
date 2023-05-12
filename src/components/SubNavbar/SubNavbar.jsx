import "./SubNavbar.css";
import { NavLink } from "react-router-dom";

const SubNavbar = () => {
  let activeStyle = {
    textDecoration: "none",
    borderTop: "2px solid var(--cta-color)",
    backgroundColor: "var(--nav-item-hover)",
  };

  return (
    <section className="SubNavbar">
      <ul className="SubNavbar-ul">
        <li className="SubNavbar-li SubNavbar-li-1">
          <NavLink to={"/Gallery/Images"} style={({ isActive }) => (isActive ? activeStyle : undefined)} >
            <span className="material-symbols-outlined">palette</span>{" "}
            <span>Bilder</span>
          </NavLink>
        </li>
        <li className="SubNavbar-li SubNavbar-li-2">
          <NavLink to={"/Gallery/Textiles"} style={({ isActive }) => (isActive ? activeStyle : undefined)} >
            <span className="material-symbols-outlined">sign_language</span>
            <span>Håndlaget tekstil</span>
          </NavLink>
        </li>
      </ul>
    </section>
  );
};

export default SubNavbar;
