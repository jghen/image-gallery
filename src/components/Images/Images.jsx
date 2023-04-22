import "./Images.css";
import { useState, useEffect } from "react";
import Container from "../../hoc/Container.jsx";
import Card from "../Card.jsx";
import CardPage from "../CardPage.jsx";
import AddCard from "../AddCard.jsx";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAllImages, deleteImage, selectImages } from "./imagesSlice.jsx";
import { selectIsSignedIn } from "../../app/authSlice";
import { storageRead, storageSave } from "../../storage/storage.jsx";
import { STORAGE_KEY_IMAGES } from "../../const/storageKeys.jsx";
import { fetchInitialImages } from "../../api/imagesFetch.jsx";

const Images = () => {
  //state global
  const images = useSelector(selectImages);
  const loggedIn = useSelector(selectIsSignedIn);
  const dispatch = useDispatch();

  // state local
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // hooks
  const navigate = useNavigate();

  // side effects
  const fetchInitialData = () => {
    fetchInitialImages()
      .then((initialData) => {
        console.log("fetching initial");
        dispatch(setAllImages(initialData));
        storageSave(STORAGE_KEY_IMAGES, initialData);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        dispatch(setAllImages(null));
        storageSave(STORAGE_KEY_IMAGES, null);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (images.length === 0) return fetchInitialData();

    setLoading(false);
    const ImagesStorage = storageRead(STORAGE_KEY_IMAGES);

    console.log("state and storage", images.length, ImagesStorage.length);
  }, [images.length]);

  //events
  const deleteCard = (cardId) => {
    // delete from state
    dispatch(deleteImage(cardId));

    //update storage
    const newimages = images.filter((img) => img.id !== cardId);
    storageSave(STORAGE_KEY_IMAGES, newimages);
  };

  const onCardClick = (e) => {
    const card = e.target.closest("section");
    const btn = e.target.closest("button");

    if (!card && !btn) return;

    const cardId = card.id.slice(5, card.id.length); //cut out "card-"

    // if btn clicked - remove card
    if (btn && btn.id === "card-close-btn") {
      console.log("deleting card with id", cardId);
      const cardTitle = document.querySelector(`#${card.id} h3`);

      const msg = confirm(`Vil du slette ${cardTitle.textContent}?`);
      return msg === true ? deleteCard(cardId) : null;
    }

    // otherwise go to the card page
    return navigate(`/Gallery/Images/${cardId}`);
  };

  return (
    <>
      <Container>
        <Routes>
          <Route
            path="/"
            element={
              <div id="Images" className="Images">
                {loading && <div>A moment please...</div>}
                {error && (
                  <div>{`There is a problem fetching the post data - ${error}`}</div>
                )}
                <section className="Images-grid">
                  {images &&
                    images.map(({ id, imageUrl, title, subtitle }, i) => (
                      <Card
                        key={`Card-${i}`}
                        imageUrl={imageUrl}
                        title={title}
                        id={id}
                        subtitle={subtitle}
                        onCardClick={onCardClick}
                        index={i}
                      />
                    ))}
                  {loggedIn === true && <AddCard />}
                </section>
              </div>
            }
          />

          {images &&
            images.map(({ id, imageUrl, title, subtitle, text }, i) => (
              <Route
                key={`Route-CardPage-${i}`}
                path={`${id}`}
                element={
                  <CardPage
                    key={`CardPage-${id}`}
                    imageUrl={imageUrl}
                    title={title}
                    id={id}
                    subtitle={subtitle}
                    text={text}
                  />
                }
              />
            ))}
        </Routes>
      </Container>
    </>
  );
};

export default Images;
