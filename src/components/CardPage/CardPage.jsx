import BackButton from "../BackButton/BackButton";
import "./CardPage.css";

const CardPage = ({ id, imageUrl, title, subtitle, text }) => {
  return (
    <section id={`CardPage-${id}`} className="CardPage">
    
      <div className="CardPage-body">
      <BackButton/>
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
    </section>
  );
};

export default CardPage;
