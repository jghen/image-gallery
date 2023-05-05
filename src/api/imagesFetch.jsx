import { createHeaders } from "./index";
import { API_BASE_URL } from "../const/urls";

//get All
export const fetchInitialImages = async () => {
  try {
    const options = {
      method: "GET",
      headers: createHeaders(),
    };
    const url = API_BASE_URL + "/images";

    const response = await fetch(url, options);

    if (!response.ok) {
      alert(response.statusText);
      return new Error("Could not fetch", response.status);
    }

    const result = await response.json();

    console.log(result);
    return result.data.result.imageData
      .map((img, i) => {
        if (!img) return null;
        return {
          id: img.id,
          imageUrl: decodeURI(result.data.result.encodedUrls[i]),
          title: img.title,
          subtitle: img.subtitle,
          text: img.description,
        };
      })
      .filter((img) => img != null);
  } catch (error) {
    return error.message;
  }
};

//post upload
export const submitUploadToDb = async (data) => {
  const { id, image, title, subtitle, text } = data;
  const formData = new FormData();
  formData.append("image", image);
  formData.append("title", title);
  formData.append("subtitle", subtitle);
  formData.append("text", text);

  const url = `${API_BASE_URL}/images/${id}`;
  const options = {
    method: "POST",
    credentials: "include",
    // headers: {
    //   "Content-Type": "multipart/form-data",
    //  },
    body: formData,
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      alert(response.statusText);
      return new Error("Could not fetch", response.status);
    }
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

//delete image
export const deleteImageFromDb = async (key) => {
  const options = {
    method: "DELETE",
    credentials: "include",
    headers: createHeaders(),
  };
  const url = `${API_BASE_URL}/images/${key}`;

  try {
    const response = await fetch(url, options);
    console.log(response)
    if (!response.ok) {
      alert(response.statusText);
      return new Error("Could not fetch", response.status);
    }
    const result = await response.json();
    console.log(result);
    return Promise.allSettled(result);
  } catch (error) {
    console.log(error);
    return error.message;
  }
};
