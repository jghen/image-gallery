import "./Card.css";
import Container from "../../hoc/Container.jsx";
import { useSelector } from "react-redux";
import { selectIsSignedIn } from "../../state/authSlice";
import { useState } from "react";
import { Blurhash } from "react-blurhash";

const Card = ({ id, blurHash, imageUrl, title, subtitle, onCardClick, index, }) => {
  console.log('--blurHash',blurHash)
  //state
  const loggedIn = useSelector(selectIsSignedIn);
  const [loaded, setLoaded] = useState(false);

  //events
  const handleCardClick = (e) => {
    onCardClick(e);
  };
  console.log("loggedIn", loggedIn);

  const imageLoaded = (e) => setLoaded(true);

  //Custom components
  const SkeletonText = () => <div className="skeleton-text" style={{ display: loaded ? "none" : "block" }} ></div>;
  // const SkeletonImage = () => <div className="skeleton-img" style={{ display: loaded ? "none" : "block" }} ></div>;
  const BlurredImage = () => {
    return (
      <div className="skeleton-img" style={{ display: loaded ? "none" : "block" }} >
        <Blurhash
          hash={blurHash}
          width={250}
          height={166}
          resolutionX={40}
          resolutionY={40}
          punch={1}
        />
      </div>
    );
  };

  const loadedStyles = { display: loaded ? "block" : "none", };

  return (
    <section className="card" id={`card-${id}`} onClick={handleCardClick}>
      {loggedIn === true && (
        <button id="card-close-btn" className="btn" style={{ display: loaded ? "flex" : "none" }} >
          <span>+</span>
        </button>
      )}
      <Container>
        <div className="card-body">
          {/* <SkeletonImage/> */}
          <BlurredImage/>
          <img
            style={loadedStyles}
            src={imageUrl}
            alt={title}
            loading={index > 6 ? "lazy" : "eager"}
            className="card-img"
            id={id}
            onLoad={imageLoaded}
          />
          {loaded ? <h3 id="card-title">{title}</h3> : <SkeletonText />}
          {loaded ? (
            <p>{subtitle}</p>
          ) : (
            <>
              <SkeletonText />
              <SkeletonText />
            </>
          )}
        </div>
      </Container>
    </section>
  );
};

export default Card;
