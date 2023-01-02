import "./CardPage.css";
import Container from "../hoc/Container.jsx";

const CardPage = ({ id, imageUrl, title, subtitle, text }) => {

  return (
    <Container>
      <section id={`CardPage-${id}`} className="CardPage">
        <Container>
          <div className="CardPage-body">
            <img
              src={imageUrl}
              alt={`image-${id}`}
              loading="lazy"
              className="CardPage-img"
            />
            <div className="CardPage-text">
              <h3>{title}</h3>
              <p>{subtitle}</p>
              <p> {text} </p>
            </div>
          </div>
        </Container>
      </section>
    </Container>
  );
};

export default CardPage;
