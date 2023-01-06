import { createHeaders } from "./index";

export const fetchInitialGallery = async () => {
  try {
    const options = {
      method: "GET",
      headers: createHeaders(),
    };
    const apiUrl = 'https://picsum.photos/v2/list';

    const response = await fetch(apiUrl, options);

    if (!response.ok) {
      throw new Error("Could not update the translations", response.status);
    }

    const result = await response.json();

    const sliced = result.slice(0, 10).map(({ download_url, author }) => {
      return {
        id: Math.floor(Math.random() * 10000),
        imageUrl: download_url,
        title: author,
        subtitle: "random subtitle",
        text: "this is the long text",
      };
    });
    
    return sliced;

  } catch (error) {
    return [error.message, null];
  }
};