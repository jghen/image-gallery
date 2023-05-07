import { useSelector } from "react-redux";
import BackButton from "../BackButton/BackButton";
import "./CardPage.css";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { selectImages } from "../Images/imagesSlice";

const CardPage = (/* { images } */) => {
  let { imageId } = useParams();
  const images = useSelector(selectImages);

  const [image] = images.filter((img) => img.id == imageId);
  const { blurHash, id, imageUrl, title, subtitle, text } = image;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {image && (
        <section id={`CardPage-${id}`} className="CardPage">
          <div className="CardPage-body">
            <BackButton />
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
      )}
    </>
  );
};

export default CardPage;
