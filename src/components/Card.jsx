import "./Card.css";
import Container from "../hoc/Container.jsx";
import { useNavigate } from "react-router-dom";


const Card = ({ id, imageUrl, author }) => {

  const navigate = useNavigate();

  const deleteCard = (card) => {
    //delete from database:

    //delete from dom:
    return card.remove();
  }

  const handleCardClick = (e) => {

    if (e.target.closest('button').id === 'card-close-btn') {
      // delete current card
      const card = e.target.closest('section');
      console.log('deleting card with id', card.id);
      const cardTitle = document.querySelector(`#${card.id} h3`);
      
      const msg = confirm(`Vil du slette ${cardTitle.textContent}?`);
      return msg === true ? deleteCard(card) : null;
    } 
    navigate(`/gallery/${id}`);
  };

  return (
    <section className="card" id={`card-${id}`} onClick={handleCardClick}>
      <button id="card-close-btn" className="btn">
        <span>+</span>
      </button>
      <Container>
        <div className="card-body">
          <img
            src={`${imageUrl}`}
            alt="some-image"
            loading="lazy"
            className="card-img"
          />
          <h3 id="card-title">{author}</h3>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing.</p>
        </div>
      </Container>
    </section>
  );
};

export default Card;
