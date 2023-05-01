import "./AddCard.css";
import Container from "../../hoc/Container.jsx";
import AddModal from "../AddModal/AddModal.jsx";
import Loader from "../Loader/Loader.jsx";
import { useState } from "react";
import { selectIsUploading } from "../../state/loaderSlice.jsx";

import "material-symbols";
import { useSelector } from "react-redux";

const AddCard = () => {
  const uploading = useSelector(selectIsUploading);
  const [modalOpen, setModalOpen] = useState(false);

  const handleAddCardClick = () => {
    return setModalOpen(true);
  };

  const handleClose = (bool) => {
    setModalOpen(bool);
  };

  return (
    <section className="AddCard" id={`AddCard`} onClick={handleAddCardClick}>
      <Container>
        <div className="AddCard-body">
          {uploading === true ? <Loader /> : <p className="AddCard-pluss">+</p>}
          <p>Legg til nytt innhold</p>
        </div>
      </Container>
      {modalOpen && <AddModal isOpen={modalOpen} handleClose={handleClose} />}
    </section>
  );
};

export default AddCard;
