import "./SubNavbar.css";
import { NavLink } from "react-router-dom";

const SubNavbar = () => {
  let activeStyle = {
    textDecoration: "underline",
    color: "var(--cta-color-hover)",
  };

  return (
    <section className="SubNavbar">
      <ul className="SubNavbar-ul">
        <li className="nav-li">
          <NavLink
            to={"/Gallery/Images"}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Bilder
          </NavLink>
        </li>
        <li className="nav-li">
          <NavLink
            to={"/Gallery/Textiles"}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Tekstiler
          </NavLink>
        </li>
        <li className="nav-li">
          <NavLink
            to={"/Gallery/Other"}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Annet
          </NavLink>
        </li>
      </ul>
    </section>
  );
};

export default SubNavbar;
