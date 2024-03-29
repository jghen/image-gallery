import { useSelector, useDispatch } from "react-redux";
import BackButton from "../BackButton/BackButton";
import "./CardPage.css";
import { useEffect} from "react";
import { useParams} from "react-router-dom";
import { selectImages, setAllImages } from "../Images/imagesSlice";
import { STORAGE_KEY_IMAGES } from "../../const/storageKeys";
import { storageRead } from "../../storage/storage";

const CardPage = (/* { images } */) => {
  let { imageId } = useParams();
  let images = useSelector(selectImages);
  const dispatch = useDispatch();
  images = storageRead(STORAGE_KEY_IMAGES);
  console.log(images)

  useEffect(() => {
    
    window.scrollTo(0, 0);
  }, []);


  if(!images) {
    return <div>kan ikke hente bildet..</div>
  }

  const [image] = images?.filter((img) => img?.id == imageId);

  console.log(images, imageId, image);

  return (
    <>
      {image && (
        <section id={`CardPage-${image.id}`} className="CardPage">
          <div className="CardPage-body">
            <BackButton />
            <img
              src={image.imageUrl}
              alt={`image-${image.id}`}
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
      ) }
    </>
  );
};

export default CardPage;
