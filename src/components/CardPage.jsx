import "./CardPage.css";
import Container from "../hoc/Container.jsx";

const CardPage = ({ imageUrl, author }) => {

  return (
    <Container>
      <section className="CardPage">
        <Container>
          <div className="CardPage-body">
            <img
              src={`${imageUrl}`}
              alt="some-image"
              loading="lazy"
              className="CardPage-img"
            />
            <div className="CardPage-text">
              <h3>{author}</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Deleniti autem facere magnam accusantium quas perspiciatis!
              </p>
            </div>
          </div>
        </Container>
      </section>
    </Container>
  );
};

export default CardPage;
