import axios from "axios";
import { userSearchApiBaseUrl } from "../constants";
import {
  getEssentialPostsInfo,
  getFilteredUserData,
  getFilteredUsersData,
  getUserDataFields,
} from "../util";
import { getAllPosts } from "./postApis";

export async function getAuthorData(queryParams) {
  try {
    const apiResponse = await axios.get(userSearchApiBaseUrl, {
      params: queryParams,
    });
    
    const apiData = apiResponse.data;
    return apiData;
  } catch (e) {
    return [];
  }
}
export async function getAuthorDataByID(userId) {
  try {
    const apiResponse = await axios.get(
      `https://journomed.com/wp-json/wp/v2/users/${userId}`
    );

    const authorData = apiResponse?.data;

    return authorData;
  } catch (e) {
    return [];
  }
}

export async function getAuthorDataWithSlugAndMorePosts(slug, limit = 10) {
  const userDataFilter = getUserDataFields();
  const query = {
    slug: slug,
    per_page: limit,
    _fields: userDataFilter,
  };
  const userDataResponse = await getAuthorData(query);
  const userData =
    (userDataResponse.length > 0 && getFilteredUserData(userDataResponse[0])) ||
    [];

  const morePosts = await getAllPosts(10, { author: userData.id });
  const filteredMorePosts = getEssentialPostsInfo(morePosts);

  return (
    { userData, morePosts: filteredMorePosts } || {
      userData: {},
      morePosts: [],
    }
  );
}

export async function getAllUserData(limit = 10) {
  const userDataFilter = getUserDataFields();
  const query = {
    per_page: limit,
    _fields: userDataFilter,
  };
  const userDataResponse = await getAuthorData(query);

  const userData = getFilteredUsersData(userDataResponse);
  return userData;
}

export async function getAllUserDataSlugs(limit = 10) {
  const allUserData = await getAllUserData(limit);
  const allUserDataSlugs = allUserData.map((userData) => {
    return userData.slug;
  });
  return allUserDataSlugs;
}
