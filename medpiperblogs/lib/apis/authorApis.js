import axios from "axios";
import { userSearchApiBaseUrl } from "../constants";
import {
  getEssentialPostsInfo,
  getFilteredUserData,
  getFilteredUsersData,
  getUserDataFields,
} from "../util";
import { getAllPosts } from "./postApis";

// All the functions related to user search
// All function are async functions

export async function getAuthorData(queryParams) {
  // getAuthorData is a function that takes in a queryParams object
  // and returns a promise that resolves to an object containing
  // the apiData and totalPostData
  // The apiData is an array of objects containing the data of the
  // author that matches the queryParams
  // The totalPostData is an object containing the total number of
  // posts and the total number of pages

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
  // getAuthorDataByID is a function that takes in a userId
  // and returns a promise that resolves to an object containing
  // the apiData
  // The apiData is an Array of object containing the data of the
  // author that matches the userId

  try {
    const apiResponse = await axios.get(`${userSearchApiBaseUrl}/${userId}`);
    const authorData = apiResponse?.data;

    return authorData;
  } catch (e) {
    return [];
  }
}

export async function getAuthorDataWithSlugAndMorePosts(slug, limit = 10) {
  // getAuthorDataWithSlugAndMorePosts is a function that takes in a slug
  // and returns a promise that resolves to an filter Array  containing the apiData
  // The apiData is an Array containing the data of the author that matches the slug
  // getFilteredUserData will filter the apiData to only contain the data that is needed

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

  // Get the posts of the author
  // getEssentialPostsInfo will filter the posts to only contain the data that is needed
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
  // getAllUserData is a function that takes in a limit
  // and returns a promise that resolves to an filter Array  containing the apiData
  // The userDataResponse is an Array containing the data of the author that matches the slug
  // result will be passed trough getFilteredUsersData to get the filtered data

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
  // getAllUserData is a function that takes in a limit
  // and returns a promise that resolves to an  Array containing Author
  // All the slugs of the authors are stored in allUserDataSlugs

  const allUserData = await getAllUserData(limit);
  const allUserDataSlugs = allUserData.map((userData) => {
    return userData.slug;
  });
  return allUserDataSlugs;
}

