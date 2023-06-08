import "./Images.css";
import { useState, useEffect, useCallback } from "react";
import Card from "../Card/Card.jsx";
import AddCard from "../AddCard/AddCard.jsx";
import CardPage from "../CardPage/CardPage.jsx";
import { Routes, Route, useNavigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAllImages, deleteImage, selectImages } from "./imagesSlice.jsx";
import { selectIsSignedIn } from "../../state/authSlice";
import { storageRead, storageSave } from "../../storage/storage.jsx";
import { STORAGE_KEY_IMAGES } from "../../const/storageKeys.jsx";
import {
  fetchInitialImages,
  deleteImageFromDb,
} from "../../api/imagesFetch.jsx";
import { saveImages } from "../../../utils/saveImages";
import Loader from "../Loader/Loader.jsx";

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
  const fetchInitialData = useCallback(async () => {
    // setLoading(true);
    let initialData;
    try {
      initialData = await fetchInitialImages();
    } catch (err) {
      setError(err.message);
      dispatch(setAllImages(null));
      storageSave(STORAGE_KEY_IMAGES, null);
    }
    dispatch(setAllImages(initialData));
    storageSave(STORAGE_KEY_IMAGES, initialData);
    setError(null);
    setLoading(false);

  }, []);

  useEffect(() => {
    fetchInitialData();
    // setLoading(false);
  }, [fetchInitialData]);

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

      const msg = confirm(`Vil du slette ${cardTitle.textContent}?`);
      return msg === true ? await deleteCard(cardId) : null;
    }

    // otherwise go to the card page
    return navigate(`/Gallery/Images/${cardId}`);
  };

  //components
  const AllImages = ({ images }) => {
    return (
      <div key={Math.round() * 12345} id="Images" className="Images">
        {error && (
          <div>{`There is a problem fetching the post data - ${error}`}</div>
        )}
        <section className="Images-grid">
          {images &&
            images.map(
              ({ id, blurHash, imageUrl, title, subtitle, text }, i) => (
                <Card
                  key={id}
                  imageUrl={imageUrl}
                  title={title}
                  id={id}
                  subtitle={subtitle}
                  onCardClick={onCardClick}
                  index={i}
                  blurHash={blurHash}
                />
              )
            )}

          {loggedIn === true && (
            <AddCard key={Math.floor(Math.random() * 1000)} />
          )}
        </section>
      </div>
    );
  };
  console.log("----loading", loading);

  return (
    <>
      {loading ? (
        <div className="images-loader-wrapper">
          <Loader />
          <p>            
          Loading...
          </p> 
        </div>
      ) : (
        <AllImages images={images} />
      )}
      {/* <Outlet/> */}
    </>
  );
};

export default Images;
