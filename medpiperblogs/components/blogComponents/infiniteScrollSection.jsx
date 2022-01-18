import React, { useEffect, useState, useRef } from "react";
import { getPostsByPage } from "../../lib/apis/postApis";
import PostPreview from "./post-preview";
import PostSkeleton from "./postSkeleton";

const InfiniteScrollSection = ({ InitialPosts = [], filter = {} }) => {
  const [posts, setPosts] = useState(InitialPosts);
  const [loading, setLoading] = useState(false);

  const newPageRef = useRef(1);
  const lastPostRef = useRef(null);
  const [totalPages, setTotalPages] = useState(Infinity);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, options);
    observer.observe(lastPostRef.current);
  }, []);

  const getMorePost = async () => {
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
