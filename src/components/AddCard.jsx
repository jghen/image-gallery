import "./AddCard.css";
import Container from "../hoc/Container.jsx";
import AddModal from "./AddModal.jsx";
import { useState } from "react";
import "material-symbols";

const AddCard = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleAddCardClick = () => {
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
      {modalOpen && <AddModal isOpen={modalOpen} handleClose={handleClose}/>}
    </section>
  );
};

export default AddCard;
