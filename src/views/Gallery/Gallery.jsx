import "./Gallery.css";
import { useState, useEffect } from "react";
import Container from "../../hoc/Container.jsx";
import Card from "../../components/Card.jsx";
import CardPage from "../../components/CardPage.jsx";
import AddCard from "../../components/AddCard.jsx";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setAllImages,
  addImage,
  deleteImage,
  selectGallery,
} from "./gallerySlice.jsx";
import { storageRead, storageSave } from "../../storage/storage";
import { STORAGE_KEY_GALLERY, STORAGE_KEY_USER } from "../../const/storageKeys";
import { fetchInitialGallery } from "../../api/galleryFetch";

const Gallery = () => {
  //state global
  const galleryData = useSelector(selectGallery);
  const dispatch = useDispatch();

  // state local
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // hooks
  const navigate = useNavigate();

  // side effects
  const fetchInitialData = () => {
    fetchInitialGallery()
      .then((initialData) => {
        console.log('fetching initial')
        dispatch(setAllImages(initialData));
        storageSave(STORAGE_KEY_GALLERY, initialData);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        dispatch(setAllImages(null));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (galleryData.length === 0) return fetchInitialData();
    
    setLoading(false);
    const galleryStorage = storageRead(STORAGE_KEY_GALLERY);

    console.log('state and storage',galleryData.length, galleryStorage.length);
  }, [galleryData.length]);

  //events
  const deleteCard = (cardId) => {

    // delete from state
    dispatch(deleteImage(cardId));

    //update storage
    const newGalleryData = galleryData.filter(img => img.id !== cardId);
    storageSave(STORAGE_KEY_GALLERY, newGalleryData);
  };

  const onCardClick = (e) => {
    const card = e.target.closest("section");
    const btn = e.target.closest("button");

    if (!card && !btn) return;

    const cardId = parseInt(card.id.slice(5, card.id.length)); //cut out "card-"

    // if btn clicked - remove card
    if (btn && btn.id === "card-close-btn") {

      console.log("deleting card with id", cardId);
      const cardTitle = document.querySelector(`#${card.id} h3`);

      const msg = confirm(`Vil du slette ${cardTitle.textContent}?`);
      return msg === true ? deleteCard(cardId) : null;
    }

    // otherwise go to the card page
    return navigate(`/Gallery/${cardId}`);
  };

  return (
    <Container>
      <Routes>
        <Route
          path="/"
          element={
            <div id="gallery" className="Gallery">
              <h2 className="gallery-h2 text-center"></h2>
              {loading && <div>A moment please...</div>}
              {error && (
                <div>{`There is a problem fetching the post data - ${error}`}</div>
              )}
              <section className="gallery-grid">
                {galleryData &&
                  galleryData.map(({ id, imageUrl, title, subtitle }, i) => (
                    <Card
                      key={`Card-${i}`}
                      imageUrl={imageUrl}
                      title={title}
                      id={id}
                      subtitle={subtitle}
                      onCardClick={onCardClick}
                    />
                  ))}
                <AddCard />
              </section>
            </div>
          }
        />

        {galleryData &&
          galleryData.map(({ id, imageUrl, title, subtitle, text }, i) => (
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
  );
};

export default Gallery;
