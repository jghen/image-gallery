import "./Gallery.css";
import { useState, useEffect } from "react";
import Container from "../../hoc/Container.jsx";
import Card from "../../components/Card.jsx";
import CardPage from "../../components/CardPage.jsx";
import AddCard from "../../components/AddCard.jsx";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setAllImages, selectGallery } from "./gallerySlice.jsx";

const Gallery = () => {
  //state
  const galleryData = useSelector(selectGallery);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://picsum.photos/v2/list`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((actualData) => {
        dispatch(
          setAllImages(
            actualData.slice(0, 10).map(({ download_url, author }) => {
              return {
                id: Math.floor(Math.random() * 10000),
                imageUrl: download_url,
                title: author,
                subtitle: "random subtitle",
                text: "this is the long text",
              };
            })
          )
        );
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        dispatch(setAllImages(null));
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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
