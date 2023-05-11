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
              src={image.imageUrl}
              alt={`image-${id}`}
              loading="lazy"
              className="CardPage-img"
            />
            <div className="CardPage-text">
              <h3>{image.title}</h3>
              <p><i>{image.subtitle}</i></p>
              <p> {image.text} </p>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default CardPage;
