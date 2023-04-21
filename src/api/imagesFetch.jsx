import { createHeaders } from "./index";
import { API_BASE_URL } from "../const/urls";

export const fetchInitialImages = async () => {
  try {
    const options = {
      method: "GET",
      headers: createHeaders(),
    };
    const url = API_BASE_URL + '/images';

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error("Could not fetch", response.status);
    }

    const result = await response.json();

    console.log(result);
    return result.data.result.imageData.map((img, i) => {
      return {
        id: img.id,
        imageUrl: decodeURI(result.data.result.encodedUrls[i]),
        title: img.title,
        subtitle: img.subtitle,
        text: img.description,
      };
    });
    


  } catch (error) {
    return [error.message, null];
  }
};