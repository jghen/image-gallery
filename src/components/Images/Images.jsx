import "./Images.css";
import { useState, useEffect } from "react";
import Card from "../Card/Card.jsx";
import CardPage from "../CardPage/CardPage.jsx";
import AddCard from "../AddCard/AddCard.jsx";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAllImages, deleteImage, selectImages } from "./imagesSlice.jsx";
import { selectIsSignedIn } from "../../state/authSlice";
import { storageRead, storageSave } from "../../storage/storage.jsx";
import { STORAGE_KEY_IMAGES } from "../../const/storageKeys.jsx";
import { fetchInitialImages, deleteImageFromDb, } from "../../api/imagesFetch.jsx";

const Images = () => {
  //state global

  const images = useSelector(selectImages);
  const loggedIn = useSelector(selectIsSignedIn);
  const dispatch = useDispatch();

  // state local
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // hooks
  const navigate = useNavigate();

  // side effects
  const fetchInitialData = () => {
    fetchInitialImages()
      .then((initialData) => {
        setLoading(true);
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

    // fetchInitialData();
    setLoading(false);
    const ImagesStorage = storageRead(STORAGE_KEY_IMAGES);

    console.log("state and storage", images.length, ImagesStorage.length);
  }, [images.length]);

  //events
  const deleteCard = async (cardId) => {

    await deleteImageFromDb(cardId);

    //update storage
    const newimages = images.filter((img) => img.id !== cardId);
    storageSave(STORAGE_KEY_IMAGES, newimages);
    // delete from state

    return dispatch(deleteImage(cardId));
  };

  const onCardClick = async (e) => {
    const card = e.target.closest("section");
    const btn = e.target.closest("button");

    if (!card && !btn) return;

    const cardId = card.id.slice(5, card.id.length); //cut out "card-"

    // if btn clicked - remove card
    if (btn && btn.id === "card-close-btn") {
      console.log("deleting card with id", cardId);
      const cardIdArray = card.id.split(".");
      const cardIduuid = cardIdArray[0];
      const fileExtension = cardIdArray.slice(-1);
      const cardTitle = document.querySelector(
        `#${cardIduuid}\\.${fileExtension} h3`
      );
      console.log(cardTitle);

      const msg = confirm(`Vil du slette ${cardTitle.textContent}?`);
      return msg === true ? await deleteCard(cardId) : null;
    }

    // otherwise go to the card page
    return navigate(`/Gallery/Images/${cardId}`);
  };

  return (

      <Routes>
        <Route
          path="/"
          element={
            <div key={4327923107} id="Images" className="Images">
              {loading && <div>A moment please...</div>}
              {error && (
                <div>{`There is a problem fetching the post data - ${error}`}</div>
              )}
              <section className="Images-grid">
                {images &&
                  images.map(({ id, imageUrl, title, subtitle }, i) => (
                    <Card
                      key={id}
                      imageUrl={imageUrl}
                      title={title}
                      id={id}
                      subtitle={subtitle}
                      onCardClick={onCardClick}
                      index={i}
                    />
                  ))}
                {loggedIn === true && (
                  <AddCard
                    key={Math.floor(Math.random() * 1000)}
                    // onAddCard={handleAddCard}
                  />
                )}
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

  );
};

export default Images;
