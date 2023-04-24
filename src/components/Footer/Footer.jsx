import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {



  return (
    <section className="Footer">
      <Link to={'/Login'}><p>Logg inn</p></Link>
    </section>
  );
};

export default Footer;
