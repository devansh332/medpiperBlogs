import PostPreview from "./post-preview";
import InfiniteScrollSection from "./infiniteScrollSection";

export default function MoreStories({ posts }) {
  return (
    <section>
      <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
        More Stories
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:col-gap-26 lg:col-gap-32 row-gap-20 md:row-gap-32 mb-32">
        <InfiniteScrollSection InitialPosts={posts} />
      </div>
    </section>
  );
}
