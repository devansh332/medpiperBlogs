import axios from "axios";
import { tagsSearchApiBaseUrl } from "../constants";
export async function getTagsData(tagId) {
  try {
    const tagContentResponse = await axios.get(
      `${tagsSearchApiBaseUrl}/${tagId}`
    );
    const tagsContentData = tagContentResponse?.data;
    const tagsContent = tagsContentData?.name;
    return tagsContent || "";
  } catch (e) {
    return "";
  }
}

export async function getAllTags(tags) {
  const tagsData = await Promise.all(
    tags.map(async (tag) => {
      const tagData = await getTagsData(tag);
      return tagData;
    })
  );
  
  return tagsData;
}
