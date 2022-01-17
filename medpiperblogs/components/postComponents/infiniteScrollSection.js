import React, { useEffect, useState, useRef } from "react";
import { getFilteredAllPosts, getPostsByPage } from "../../lib/api";
import PostPreview from "./post-preview";
import PostSkeleton from "./postSkeleton";

export default function InfiniteScrollSection({ InitialPosts = [] }) {
  // InfiniteScrollSection accept InitialPosts as props
  // InitialPosts is an array of posts
  // InfiniteScrollSection will render posts in InitialPosts
  // InfiniteScrollSection have a state to store posts
  // InfiniteScrollSection have a ref to store the last post
  // InfiniteScrollSection have a state to store the loading state
  // IntersectionObserver will observe the ref and will call the callback when the ref is in viewport
  // IntersectionObserver will call the callback when the ref is in viewport

  const [posts, setPosts] = useState(InitialPosts);
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState(2);
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
    newPageRef.current = nextPage;

    setLoading(true);
    const { completePostsData, totalPostData } = await getPostsByPage(
      nextPage,
      10,
      10
    );
    setPages((prevPage) => {
      return prevPage + 1;
    });
    setTotalPages(() => totalPostData.totalPages);
    setPosts((posts) => [...posts, ...completePostsData]);

    setLoading(false);
  };
  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      getMorePost();
    }
  };

  return (
    <>
      {posts.map((post) => {
        return (
          <PostPreview
            key={post.slug}
            title={post?.title}
            coverImage={post.postContentImage}
            date={post.date}
            author={post.userData}
            slug={post.slug}
            excerpt={post?.excerpt}
          />
        );
      })}

      {totalPages > newPageRef.current && (
        <div ref={lastPostRef}>
          {loading && (
            <div className="  h-100 p-4 mr-5 mb-5">
              <PostSkeleton />
            </div>
          )}
        </div>
      )}
    </>
  );
}
