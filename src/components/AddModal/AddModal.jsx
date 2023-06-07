import "./AddModal.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addImage, selectImages } from "../Images/imagesSlice.jsx";
import { storageSave } from "../../storage/storage";
import { STORAGE_KEY_IMAGES } from "../../const/storageKeys";
import { v4 as uuidv4 } from "uuid";
import { submitUploadToDb, fetchInitialImages } from "../../api/imagesFetch";
import { isUploading, isNotUploading } from "../../state/loaderSlice";

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

  const handleModalClick = async (e) => {
    const closeBtn = e.target.closest("button");
    if (closeBtn && closeBtn.id === "modal-close-btn") {
      return setOpen(false);
    }

    if (e.target.id === "submit-upload-btn") {
      // close modal
      setOpen(false);
      //submit data
      const imgObject = selectedImage; //this is the file object
      const title = document.querySelector("#add-title").value;
      const sub = document.querySelector("#add-subtitle").value;
      const text = document.querySelector("#add-text").value;
      // const makeId = uuidv4();
      const makeId = Date.now();
      console.log("this is img now", imgObject);
      const ext = imgObject.type.split("/").slice(-1);

      const imgToDisplay = URL.createObjectURL(imgObject);
      console.log('img to display',imgToDisplay)

      const data = {
        id: `${makeId}.${ext}`,
        image: imgObject,
        title: title,
        subtitle: sub,
        text: text,
      };
      const clientData = {
        id: `${makeId}.${ext}`,
        imageUrl: imgToDisplay,
        title: title,
        subtitle: sub,
        text: text,
      };
      console.log("clientData.id", clientData.id);

      let blurHash;
      try {
        dispatch(isUploading());
        const upload = await submitUploadToDb(data);
        blurHash = upload.data.result.db_image.name; //get hash in response
        console.log(upload);
      } catch (error) {
        console.log(error.message);
        alert(error.message);
      } finally {
        addNewCard({...clientData, blurHash:blurHash});
        dispatch(isNotUploading());
        
        
      }
    }

    return ;
  };

  return (
    <section onClick={handleModalClick} id="add-modal" className="add-modal">
      <button id="modal-close-btn" className="btn close-btn">
        <span>+</span>
      </button>
      
      <label className="file-upload-label">
      {selectedImage && (
        <div className="img-wrapper">
        <button
            style={{
              position: "absolute",
              zIndex: "150",
            }}
            onClick={() => setSelectedImage(null)}
          >
            Remove
          </button>
          <img
            className="img"
            alt="not found"
            width={"100%"}
            src={URL.createObjectURL(selectedImage)}
          />
          <br />
          
        </div>
      )}
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
