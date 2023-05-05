import "./Navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  let activeStyle = {
    textDecoration: "none",
    backgroundColor: "var(--cta-color)",
    borderRadius: "var(--border-radius)",
    color: "var(--primary-color)",
  };

  return (
    <section className="navbar">
      <h1 className="nav-h1">Anne Geiger</h1>
      <ul className="nav-ul">
        <li className="nav-li">
          <NavLink
            to={"/"}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Hjem
          </NavLink>
        </li>
        <li className="nav-li">
          <NavLink
            to={"/Gallery"}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Galleri
          </NavLink>
        </li>
        <li className="nav-li">
          <NavLink
            to={"/About"}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Om meg
          </NavLink>
        </li>
        <li className="nav-li">
          <NavLink
            to={"/Contact"}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Kontakt
          </NavLink>
        </li>
      </ul>
    </section>
  );
};

export default Navbar;
