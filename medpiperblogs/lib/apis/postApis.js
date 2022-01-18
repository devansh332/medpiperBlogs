import axios from "axios";
import { mediaSearchApiBaseUrl, postSearchApiBaseUrl } from "../constants";
import {
  getCompletePostInfo,
  getCompletePostTileFields,
  getEssentialPostsInfo,
  getFilteredUserData,
  getPostTileFields,
} from "../util";
import { getAuthorDataByID } from "./authorApis";
import { getContentImagePost } from "./mediaApis";
import { getAllTags } from "./tagsApis";

export async function getPostData(queryParams) {
  try {
    const apiResponse = await axios.get(postSearchApiBaseUrl, {
      params: queryParams,
    });
    const apiData = apiResponse?.data || [];

    const totalPostData = {
      totalPosts: parseInt(apiResponse?.headers["x-wp-total"] || 0),
      totalPages: parseInt(apiResponse?.headers["x-wp-totalpages"] || 0),
    };
    return { apiData, totalPostData };
  } catch (e) {
    return { apiData: [], totalPostData: { totalPosts: 0, totalPages: 0 } };
  }
}

export async function getSlugsOfPosts(limit = 10) {
  const query = {
    per_page: limit,
    _fields: "slug",
  };
  const { apiData } = await getPostData(query);

  const allSlugs = apiData
    .map((post) => {
      return post?.slug || "";
    })
    .filter((slug) => slug);

  return allSlugs;
}

export async function getPostBySlug(slug) {
  const query = {
    slug: slug,
    _fields: getCompletePostTileFields(),
  };

  const { apiData: postResponse } = await getPostData(query);
  const postData = postResponse[0];

  return postData;
}

export async function getAllPosts(
  limit = 10,
  filters = {},
  fields = getPostTileFields()
) {
  const query = {
    per_page: limit,
    _fields: fields,
    ...filters,
  };
  const { apiData } = await getPostData(query);

  const blogPosts = await Promise.all(
    apiData.map(async (post) => {
      const postContentImage = await getContentImagePost(post.featured_media);

      const userData = await getAuthorDataByID(post.author);

      return { ...post, postContentImage, userData };
    })
  );

  return blogPosts || [];
}

export async function getFilteredAllPosts(limit = 10) {
  const homePagePosts = await getAllPosts(limit);

  const filterHomePagePosts = getEssentialPostsInfo(homePagePosts);

  return filterHomePagePosts || [];
}

export async function getPostsByPage(
  page = 1,
  offset = 0,
  limit = 10,
  filters = {}
) {
  try {
    const query = {
      per_page: limit,
      page: page,
      _fields: getPostTileFields(),
      ...filters,
    };
    const { apiData, totalPostData } = await getPostData(query, true);
    const completePostsData = await Promise.all(
      apiData.map(async (post) => {
        const postContentImage = await getContentImagePost(post.featured_media);
        const userData = await getAuthorDataByID(post.author);

        return { ...post, postContentImage, userData };
      })
    );

    const filterCompletePostsData = getEssentialPostsInfo(completePostsData);
    return (
      { completePostsData: filterCompletePostsData, totalPostData } || {
        completePostsData: [],
        totalPostData: {},
      }
    );
  } catch (err) {
    return { completePostsData: [], totalPostData: {} };
  }
}

export async function getPostAndMorePosts(slug) {
  try {
    const post = await getPostBySlug(slug);

    post.postContentImage = await getContentImagePost(post.featured_media);
    const userDataResponse = await getAuthorDataByID(post.author);
    post.userData = getFilteredUserData(userDataResponse);
    post.tags = await getAllTags(post.tags);

    const morePosts = await getAllPosts(2);
    const filterCompletePostsData = getEssentialPostsInfo(morePosts);

    const filteredPost = getCompletePostInfo(post);

    return { post: filteredPost, morePosts: filterCompletePostsData };
  } catch (e) {
    return [];
  }
}
