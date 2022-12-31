import "./Gallery.css";
import { useState, useEffect } from "react";
import Container from "../hoc/Container.jsx";
import Card from "../components/Card.jsx";
import CardPage from "../components/CardPage.jsx";
import AddCard from "../components/AddCard.jsx";
import { Routes, Route } from "react-router-dom";

const Gallery = () => {
  const [data, setData] = useState(null);
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
        setData(actualData);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Container>
      <Routes>
        <Route path="/" element={
          <div id="gallery" className="Gallery">
            <h2 className="gallery-h2 text-center"></h2>
            {loading && <div>A moment please...</div>}
            {error && (
              <div>{`There is a problem fetching the post data - ${error}`}</div>
            )}
            <section className="gallery-grid">
              {data &&
                data .slice(0, 10) .map(({ id, download_url, author }) => (
                  <Card
                    key={`Card-${id}`}
                    imageUrl={download_url}
                    author={author}
                    id={id}
                  />
                ))}
                <AddCard/>
            </section>
          </div>
        }/>
        {data && data .slice(0, 10) .map(({ id, download_url, author }) => (
          <Route
            key={`Route-${id}`}
            path={`:${id}`}
            element={
              <CardPage
                key={`CardPage-${id}`}
                imageUrl={download_url}
                author={author}
                id={id}
              />
            }
          />
        ))}
      </Routes>
    </Container>
  );
};

export default Gallery;
