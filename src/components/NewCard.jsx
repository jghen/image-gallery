import { Routes, Route } from "react-router-dom";
import CardPage from "./CardPage.jsx";
import Card from "./Card.jsx";

const NewCard = ({ data }) => {
  const { id, imageUrl, title, subtitle, text } = data;

  return (
    <>
      <Card
        key={`Card-${id}`}
        imageUrl={imageUrl}
        title={title}
        id={id}
        subtitle={subtitle}
      />
      <Routes>
        <Route
          key={`Route-CardPage-${id}`}
          path={`:${id}`}
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
      </Routes>
    </>
  );
};

export default NewCard;
