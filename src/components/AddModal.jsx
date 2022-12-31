import "./AddModal.css";
import { useState, useEffect } from "react";
const AddModal = ({ isOpen, handleClose }) => {
  const [open, setOpen] = useState(isOpen);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    setOpen(open);
    handleClose(open);
  }, [open]);

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      return setSelectedImage(e.target.files[0]);
    }
    return;
  };

  const handleModalClick = (e) => {
    if (e.target.closest('button').id === 'modal-close-btn') {
      return setOpen(false);
    }

    if (e.target.id === "submit-upload-btn") {
      // close modal
      setOpen(false);
      //submit data
      const img = selectedImage;
      const title = document.querySelector("#add-title").value;
      const text = document.querySelector("#add-text").value;

      submitUpload([img, title, text]);
    }
    return;
  };

  const submitUpload = (data) => {
    // const [img, title, text] = data;
    console.log("submitting upload data", data);
    return;
  };

  return (
    <section onClick={handleModalClick} id="add-modal" className="add-modal">
      <button id="modal-close-btn" className="btn close-btn">
        <span>+</span>
      </button>
      {selectedImage && (
        <div style={{ position: "absolute", top: "1.5rem", left: 0, right: 0, margin: "0 auto", height: "102px", width: "252px", overflow: "hidden", zIndex: "100", background: "#fff", borderRadius: ".25rem", }} >
          <img alt="not found" width={"100%"} src={URL.createObjectURL(selectedImage)} />
          <br />
          <button
            style={{
              position: "absolute",
              zIndex: "150",
              top: "5rem",
              left: ".1rem",
            }}
            onClick={() => setSelectedImage(null)}
          >
            Remove
          </button>
        </div>
      )}
      <label className="file-upload-label">
        <span className="material-symbols-outlined">cloud_upload</span>
        <input
          onChange={handleFileUpload}
          className="file-upload"
          id="file-upload"
          type="file"
        />
        <span>Last opp bilde</span>
      </label>
      <label htmlFor="add-title">Tittel:</label>
      <input
        className="add-title"
        type="text"
        id="add-title"
        name="add-title"
      />
      <label htmlFor="add-text">Tekst:</label>
      <textarea
        className="add-text"
        name="add-text"
        id="add-text"
        cols="20"
        rows="5"
        maxLength="100"
      ></textarea>
      <button id="submit-upload-btn" className="cta-btn btn">
        Legg til
      </button>
    </section>
  );
};

export default AddModal;
