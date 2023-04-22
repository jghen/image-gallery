import "./Card.css";
import Container from "../hoc/Container.jsx";
import { useSelector } from "react-redux";
import { selectIsSignedIn } from "../app/authSlice";

const Card = ({ id, imageUrl, title, subtitle, onCardClick, index }) => {

  const loggedIn = useSelector(selectIsSignedIn);


  const handleCardClick = (e) => {
    onCardClick(e);
  };


  return (
    <section className="card" id={`card-${id}`} onClick={handleCardClick}>
      {loggedIn === true &&
      <button id="card-close-btn" className="btn">
        <span>+</span>
      </button>
      }
      <Container>
        <div className="card-body">
          <img
            src={imageUrl}
            alt="some-image"
            loading={index > 3 ? "lazy" : "eager"}
            className="card-img"
            id={id}
          />
          <h3 id="card-title">{title}</h3>
          <p>{subtitle}</p>
        </div>
      </Container>
    </section>
  );
};

export default Card;
