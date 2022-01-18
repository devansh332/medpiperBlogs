import axios from "axios";
import { mediaSearchApiBaseUrl } from "../constants";

export async function getContentImagePost(featured_media) {
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
