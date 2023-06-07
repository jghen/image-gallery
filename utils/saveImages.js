import { useDispatch } from "react-redux";
import { selectImages, setAllImages } from "../src/components/Images/imagesSlice";
import { STORAGE_KEY_IMAGES, STORAGE_KEY_USER } from "../src/const/storageKeys";
import { storageSave } from "../src/storage/storage";



export const saveImages = ( images) => {
  console.log(images);
  const dispatch = useDispatch();
  dispatch(setAllImages(images));
  storageSave(STORAGE_KEY_IMAGES, images);
  return;
};