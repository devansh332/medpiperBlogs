import React, { useEffect, useState, useRef } from "react";
import { getPostsByPage } from "../../lib/apis/postApis";
import PostPreview from "./post-preview";
import PostSkeleton from "./postSkeleton";

// InfiniteScrollSection Component Documentation
// InfiniteScrollSection is a component that is used to load more posts
// when the user scrolls to the bottom of the page.
// It is used in the MoreStories component.
// It Show PostSkeleton while loading more posts.
// It uses IntersectionObserver to load more posts when the user scrolls to the bottom of the page.

const InfiniteScrollSection = ({ InitialPosts = [], filter = {} }) => {
  const [posts, setPosts] = useState(InitialPosts);
  const [loading, setLoading] = useState(false);

  const newPageRef = useRef(1);
  const lastPostRef = useRef(null);
  const [totalPages, setTotalPages] = useState(Infinity);

  useEffect(() => {
    // Run when component is mounted
    // Set the Observer to load more posts when the user scrolls to the bottom of the page.

    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, options);
    observer.observe(lastPostRef.current);
  }, []);

  const getMorePost = async () => {
    // getMorePost fetches more posts from the server and appends them to the posts array.
    // It also updates the totalPages state.
    // It is called when the user scrolls to the bottom of the page.

    const nextPage = newPageRef.current + 1;

    setLoading(true);
    const { completePostsData, totalPostData } = await getPostsByPage(
      nextPage,
      10,
      10,
      filter
    );

    if (completePostsData || totalPostData) {
      if (completePostsData && completePostsData.length > 0) {
        setPosts((posts) => [...posts, ...completePostsData]);
      }
      if (
        totalPages == Infinity &&
        totalPostData &&
        totalPostData?.totalPages
      ) {
        setTotalPages(() => totalPostData.totalPages);
      }
      if (totalPages == Infinity && !totalPostData?.totalPages) {
        setTotalPages(() => 0);
      }
    }
    newPageRef.current = nextPage;
    setLoading(false);
  };
  const handleObserver = (entities) => {
    // handleObserver is called when the user scrolls to the bottom of the page.
    // handleObserver checks if the user is near the bottom of the page.
    // handleObserver calls getMorePost if the user is near the bottom of the page.
    
    const target = entities[0];
    if (target?.isIntersecting) {
      getMorePost();
    }
  };

  return (
    <>
      {posts &&
        posts.map((post, index) => {
          return (
            <PostPreview
              key={index}
              title={post?.title}
              coverImage={post.postContentImage}
              date={post.date}
              author={post.userData}
              slug={post.slug}
              excerpt={post?.excerpt}
            />
          );
        })}

      {newPageRef.current && totalPages > newPageRef.current && (
        <div ref={lastPostRef}>
          {loading && (
            <div className="h-100 p-4 mr-5 mb-5">
              <PostSkeleton />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default InfiniteScrollSection;
