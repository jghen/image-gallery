import "./Navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  let activeStyle = {
    textDecoration: "none",
    borderTop: "2px solid var(--cta-color)",
    backgroundColor: "var(--nav-item-hover)",
  };

  return (
    <section className="navbar">
      <h1 className="nav-h1">Bildegalleri</h1>
      <ul className="nav-ul">
        <li className="nav-li" >
          <NavLink to={"/"} style={({ isActive }) => (isActive ? activeStyle : undefined)}>
            <span className="material-symbols-outlined">home</span>{" "}
            <span>Hjem</span>{" "}
          </NavLink>
        </li>
        <li className="nav-li" >
          <NavLink to={"/Gallery"} style={({ isActive }) => (isActive ? activeStyle : undefined)}>
            <span className="material-symbols-outlined">photo_library</span>{" "}
            <span>Galleri</span>{" "}
          </NavLink>
        </li>
        {/* <li className="nav-li" >
          <NavLink to={"/About"} style={({ isActive }) => (isActive ? activeStyle : undefined)}>
            <span className="material-symbols-outlined">face</span>{" "}
            <span>Om</span>{" "}
          </NavLink>
        </li> */}
        {/* <li className="nav-li" >
          <NavLink to={"/Contact"} style={({ isActive }) => (isActive ? activeStyle : undefined)}>
            <span className="material-symbols-outlined">contact_page</span>{" "}
            <span>Kontakt</span>{" "}
          </NavLink>
        </li> */}
      </ul>
    </section>
  );
};

export default Navbar;
