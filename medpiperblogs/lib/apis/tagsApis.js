import axios from "axios";
import { tagsSearchApiBaseUrl } from "../constants";

// All the functions related to tags search
// All function are async functions

export async function getTagsData(tagId) {
  // getTagsData is a function that takes in a tagId
  // and returns a promise that resolves to an string containing
  // the tags Name
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
  // getAllTags is a function that takes in a tags
  // and returns a promise that resolves to an Array containing
  // the tags Name

  const tagsData = await Promise.all(
    tags.map(async (tag) => {
      const tagData = await getTagsData(tag);
      return tagData;
    })
  );

  return tagsData;
}
