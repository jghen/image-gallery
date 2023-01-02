import "./Card.css";
import Container from "../hoc/Container.jsx";
import { useNavigate } from "react-router-dom";


const Card = ({ id, imageUrl, title, subtitle }) => {

  const navigate = useNavigate();

  const deleteCard = (card) => {
    //delete from database:

    //delete from dom:
    return card.remove();
  }

  const handleCardClick = (e) => {

    const card = e.target.closest('section');

    const btn = e.target.closest('button');

    console.log(card, btn, id);

    if (!card && !btn) {
      return;
    }

    if (btn && btn.id === 'card-close-btn') {
      // delete current card
      console.log('deleting card with id', card.id);
      const cardTitle = document.querySelector(`#${card.id} h3`);
      
      const msg = confirm(`Vil du slette ${cardTitle.textContent}?`);
      return msg === true ? deleteCard(card) : null;
    } 


    navigate(`/Gallery/${id}`);
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
            loading="lazy"
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
