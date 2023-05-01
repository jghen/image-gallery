import "./AddCard.css";
import Container from "../../hoc/Container.jsx";
import AddModal from "../AddModal/AddModal.jsx";
import { useState } from "react";
import "material-symbols";

const AddCard = ({ setShouldRefresh }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleAddCardClick = () => {
    // onAddCard();
    // set shouldRefresh to true to trigger a refresh
    // setShouldRefresh(true);
    return setModalOpen(true);
  };

  const handleClose = (bool) => {
    setModalOpen(bool);
  }

  return (
    <section className="AddCard" id={`AddCard`} onClick={handleAddCardClick}>
      <Container>
        <div className="AddCard-body">
          <p className="AddCard-pluss">+</p>
          <p>Legg til nytt innhold</p>
        </div>
      </Container>
      {modalOpen && <AddModal setShouldRefresh={setShouldRefresh} isOpen={modalOpen} handleClose={handleClose}/>}
    </section>
  );
};

export default AddCard;