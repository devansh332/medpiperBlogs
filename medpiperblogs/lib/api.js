import axios from "axios";
import {
  getCompletePostInfo,
  getCompletePostTileFields,
  getEssentialPostInfo,
  getEssentialPostsInfo,
  getFilteredUserData,
  getFilteredUsersData,
  getPostFields,
  getPostTileFields,
  getUserDataFields,
} from "./util";

export async function getPostData(queryParams, getTotalPostsData = false) {
  const apiResponse = await axios.get(
    `https://journomed.com/wp-json/wp/v2/posts`,
    { params: queryParams }
  );
  const apiData = apiResponse?.data || [];
  if (getTotalPostsData) {
    const totalPostData = {
      totalPosts: parseInt(apiResponse?.headers["x-wp-total"]),
      totalPages: parseInt(apiResponse?.headers["x-wp-totalpages"]),
    };
    return { apiData, totalPostData };
  } else {
    return apiData;
  }
}

export async function getUsersData(queryParams) {
  const apiResponse = await axios.get(
    `https://journomed.com/wp-json/wp/v2/users`,
    { params: queryParams }
  );

  const apiData = apiResponse.data;
  return apiData;
}

export async function getAllPostsWithSlug(limit = 10) {
  const query = {
    per_page: limit,
    _fields: "slug",
  };
  const allPosts = await getPostData(query);
  const allSlugs = allPosts.map((post) => {
    return post.slug;
  });

  return allSlugs;
}

export async function getAuthorDataWithSlugAndMorePosts(slug, limit = 10) {
  const userDataFilter = getUserDataFields();
  const query = {
    slug: slug,
    per_page: limit,
    _fields: userDataFilter,
  };
  const userDataResponse = await getUsersData(query);
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
export async function getPostBySlug(slug) {
  const query = {
    slug: slug,
    _fields: getCompletePostTileFields(),
  };

  const postResponse = await getPostData(query);
  const postData = postResponse[0];

  return postData;
}

export async function getAllUserData(limit = 10) {
  const userDataFilter = getUserDataFields();
  const query = {
    per_page: limit,
    _fields: userDataFilter,
  };
  const userDataResponse = await getUsersData(query);

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

async function getContentImagePost(featured_media) {
  try {
    const postContentImageResponse = await axios.get(
      `https://journomed.com/wp-json/wp/v2/media/${featured_media}`
    );
    const postContentImageData = postContentImageResponse?.data;
    const postContentImage = postContentImageData?.guid?.rendered;
    return postContentImage;
  } catch (e) {
    return "";
  }
}
async function getContentPostAuthor(userId) {
  try {
    const postUserResponse = await axios.get(
      `https://journomed.com/wp-json/wp/v2/users/${userId}`
    );
    const postUserData = postUserResponse?.data;

    return postUserData;
  } catch (e) {
    return [];
  }
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
  const homeApiData = await getPostData(query);
  const homePagePosts = await Promise.all(
    homeApiData.map(async (post) => {
      const postContentImage = await getContentImagePost(post.featured_media);

      const userData = await getContentPostAuthor(post.author);

      return { ...post, postContentImage, userData };
    })
  );

  return homePagePosts || [];
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
        const userData = await getContentPostAuthor(post.author);

        return { ...post, postContentImage, userData };
      })
    );
    console.log(totalPostData, "filterCompletePostsData");
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

    const userDataResponse = await getContentPostAuthor(post.author);

    post.userData = getFilteredUserData(userDataResponse);

    const morePosts = await getAllPosts(2);
    const filterCompletePostsData = getEssentialPostsInfo(morePosts);

    const filteredPost = getCompletePostInfo(post);

    return { post: filteredPost, morePosts: filterCompletePostsData };
  } catch (e) {
    return [];
  }
}
