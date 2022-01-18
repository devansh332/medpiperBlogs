import PostPreview from "./post-preview";
import InfiniteScrollSection from "./infiniteScrollSection";
import { MORE_STORY_TITLE } from "../../lib/constants";

// MoreStories Component Documentation
// MoreStories is a generic component to display more posts.
// It uses InfiniteScrollSection to load more posts when the user scrolls to the bottom of the page.

const MoreStories = ({
  posts,
  moreStoryTitle = MORE_STORY_TITLE,
  filter = {},
}) => {
  return (
    <>
      {posts.length > 0 && (
        <section>
          <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
            {moreStoryTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 md:col-gap-26 lg:col-gap-32 row-gap-20 md:row-gap-32 mb-32">
            <InfiniteScrollSection InitialPosts={posts} filter={filter} />
          </div>
        </section>
      )}
    </>
  );
};
export default MoreStories;
