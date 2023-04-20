import "./AddModal.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addImage, selectImages } from "./Images/imagesSlice.jsx";
import { storageSave } from "../storage/storage";
import { STORAGE_KEY_IMAGES } from "../const/storageKeys";
import { v4 as uuidv4 } from 'uuid';


const AddModal = ({ isOpen, handleClose }) => {
  const imagesData = useSelector(selectImages);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(isOpen);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    setOpen(open);
    handleClose(open);
  }, [open]);

  const handleFileUpload = (e) => {
    const img = e.target.files;
    if (img && img[0]) {
      //set new state
      return setSelectedImage(img[0]);
    }
    return;
  };

  const addNewCard = (newImageData) => {
    storageSave(STORAGE_KEY_IMAGES, [...imagesData, newImageData]);
    return dispatch(addImage(newImageData));
  };

  //add to database
  const submitUploadToDb = async (data) => {
    const { id, image, title, subtitle, text } = data;
    const formData = new FormData();
    formData.append("image", image);
    formData.append("id", id);
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("text", text);

    const url = `http://localhost:3000/images/${id}`;
    const options = {
      method: "POST",
      body: formData
    };

    let s3URL;
    try {
      s3URL = await fetch(url, options);
    } catch (error) {
      console.log(error);
    }

    //can display s3UrL in the front End. Returned img url from server.
    console.log('s3url',s3URL )

    return s3URL ? s3URL : false;
  };

  const handleModalClick = (e) => {
    const closeBtn = e.target.closest("button");
    if (closeBtn && closeBtn.id === "modal-close-btn") {
      return setOpen(false);
    }

    if (e.target.id === "submit-upload-btn") {
      // close modal
      setOpen(false);
      //submit data
      const img = selectedImage; //this is the file object
      const title = document.querySelector("#add-title").value;
      const sub = document.querySelector("#add-subtitle").value;
      const text = document.querySelector("#add-text").value;
      const makeId = uuidv4();

      const data = {
        id: makeId,
        image: img,
        title: title,
        subtitle: sub,
        text: text,
      };
      const clientData = {
        id: makeId,
        imageUrl: URL.createObjectURL(img),
        title: title,
        subtitle: sub,
        text: text,
      };

      submitUploadToDb(data);
      addNewCard(clientData);
    }
    return;
  };

  return (
    <section onClick={handleModalClick} id="add-modal" className="add-modal">
      <button id="modal-close-btn" className="btn close-btn">
        <span>+</span>
      </button>
      {selectedImage && (
        <div
          style={{
            position: "absolute",
            top: "1.5rem",
            left: 0,
            right: 0,
            margin: "0 auto",
            height: "102px",
            width: "252px",
            overflow: "hidden",
            zIndex: "100",
            background: "#fff",
            borderRadius: ".25rem",
          }}
        >
          <img
            alt="not found"
            width={"100%"}
            src={URL.createObjectURL(selectedImage)}
          />
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
      <label htmlFor="add-subtitle">Undertittel:</label>
      <textarea
        className="add-subtitle"
        name="add-subtitle"
        id="add-subtitle"
        cols="20"
        rows="3"
        maxLength="50"
      ></textarea>
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
