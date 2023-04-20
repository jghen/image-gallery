import "./Card.css";
import Container from "../hoc/Container.jsx";

const Card = ({ id, imageUrl, title, subtitle, onCardClick, index }) => {

  const handleCardClick = (e) => {
    onCardClick(e);
  };

  return (
    <section className="card" id={`card-${id}`} onClick={handleCardClick}>
      <button id="card-close-btn" className="btn">
        <span>+</span>
      </button>
      <Container>
        <div className="card-body">
          <img
            src={imageUrl}
            alt="some-image"
            loading={index > 3 ? "lazy" : "eager"}
            className="card-img"
          />
          <h3 id="card-title">{title}</h3>
          <p>{subtitle}</p>
        </div>
      </Container>
    </section>
  );
};

export default Card;
