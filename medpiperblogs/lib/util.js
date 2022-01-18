export const getCompletePostInfo = (post) => {
  // getCompletePostInfo is a function that takes in a post and returns a object containing the essential post data
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
    title: title?.rendered || "",
    excerpt: excerpt?.rendered || "",
    content: content?.rendered || "",
    tags: tags ? tags : [],
    slug: slug || "",
    date: date || "",
    postContentImage: postContentImage || "",
    userData: userData || [],
  };
};

export const getEssentialPostInfo = (post) => {
  // getEssentialPostInfo is a function that takes in a post and returns a object containing the essential post data
  const { title, excerpt, slug, date, postContentImage, userData } = post;

  const filterUserData = userData ? getFilteredUserData(userData) : [];
  return {
    title: title?.rendered || "",
    excerpt: excerpt?.rendered || "",
    slug: slug || "",
    date: date || "",
    postContentImage: postContentImage || "",
    userData: filterUserData || [],
  };
};

export const getEssentialPostsInfo = (allPosts) => {
  // getEssentialPostsInfo is a function that takes in array of  post and returns array of  object containing the essential post data
  return allPosts.map((post) => {
    return getEssentialPostInfo(post);
  });
};

export const getPostTileFields = () => {
  // getPostTileFields is a function that returns a strings containing the fields that we want to get from the post
  const postFields = "id,slug,title,excerpt,date,featured_media,author";
  return postFields;
};
export const getCompletePostTileFields = () => {
  // getCompletePostTileFields is a function that returns a strings containing the fields that we want to get from the post
  const postFields =
    "id,slug,title,excerpt,date,content,tags,featured_media,author";
  return postFields;
};

export const getFilteredUserData = (userData) => {
  // getFilteredUserData is a function that takes in a userData and returns a object containing the essential user data
  try {
    const { id, name, slug, avatar_urls } = userData;
    return {
      id,
      name,
      slug,
      avatar_urls: avatar_urls["24"],
    };
  } catch (e) {
    return {};
  }
};

export const getFilteredUsersData = (usersData) => {
  // getFilteredUsersData is a function that takes in a usersData and returns a array of objects containing the essential user data
  return usersData.map((userData) => {
    return getFilteredUserData(userData);
  });
};

export const getUserDataFields = () => {
  // getUserDataFields is a function that returns a strings containing the fields that we want to get from the user
  const userDataFields = "id,name,slug,avatar_urls";
  return userDataFields;
};
