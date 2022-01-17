export const getCompletePostInfo = (post) => {
  const {
    title,
    excerpt,
    slug,
    date,
    tags,
    content,
    postContentImage,
    userData,
  } = post;
  return {
    title: title.rendered,
    excerpt: excerpt.rendered,
    content: content.rendered,
    tags,
    slug,
    date,
    postContentImage,
    userData,
  };
};

export const getEssentialPostInfo = (post) => {
  const { title, excerpt, slug, date, postContentImage, userData } = post;
  const userDataFilter = getFilteredUserData(userData);
  return {
    title: title.rendered,
    excerpt: excerpt.rendered,
    slug,
    date,
    postContentImage,
    userData: userDataFilter,
  };
};

export const getEssentialPostsInfo = (allPosts) => {
  return allPosts.map((post) => {
    return getEssentialPostInfo(post);
  });
};

export const getPostTileFields = () => {
  const postFields = "id,slug,title,excerpt,date,featured_media,author";
  return postFields;
};
export const getCompletePostTileFields = () => {
  const postFields =
    "id,slug,title,excerpt,date,content,tags,featured_media,author";
  return postFields;
};

export const getFilteredUserData = (userData) => {
  const { id, name, slug, avatar_urls } = userData;
  return {
    id,
    name,
    slug,
    avatar_urls: avatar_urls["24"],
  };
};

export const getFilteredUsersData = (usersData) => {
  return usersData.map((userData) => {
    return getFilteredUserData(userData);
  });
};

export const getUserDataFields = () => {
  const userDataFields = "id,name,slug,avatar_urls";
  return userDataFields;
};
