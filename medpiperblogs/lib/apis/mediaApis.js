import axios from "axios";
import { mediaSearchApiBaseUrl } from "../constants";

// All the functions related to media search
// All function are async functions

export async function getContentImagePost(featured_media) {
  // getContentImagePost is a function that takes in a featured_media
  // and returns a promise that resolves to an string containing content Image
  // else return an empty string

  try {
    const postContentImageResponse = await axios.get(
      `${mediaSearchApiBaseUrl}/${featured_media}`
    );
    const postContentImageData = postContentImageResponse?.data;
    const postContentImage = postContentImageData?.guid?.rendered;
    return postContentImage || "";
  } catch (e) {
    return "";
  }
}
