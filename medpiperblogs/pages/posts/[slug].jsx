import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "../../components/generalComponents/container";
import PostBody from "../../components/blogComponents/post-body";
import MoreStories from "../../components/blogComponents/more-stories";
import Header from "../../components/generalComponents/header";
import PostHeader from "../../components/blogComponents/post-header";
import SectionSeparator from "../../components/generalComponents/section-separator";
import Layout from "../../components/generalComponents/layout";
import { getAllPostsWithSlug, getPostAndMorePosts } from "../../lib/api";
import PostTitle from "../../components/blogComponents/post-title";
import Head from "next/head";
import Tags from "../../components/blogComponents/tags";

const Post = ({ post, morePosts, preview }) => {
  const router = useRouter();

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : post.slug ? (
          <>
            <article>
              <Head>
                <title>{post?.title ? `${post?.title} |` : ""} Blog..</title>
                <meta property="og:image" content={post?.postContentImage} />
              </Head>
              <PostHeader
                title={post?.title}
                coverImage={post.postContentImage}
                date={post.date}
                author={post.userData}
              />
              <PostBody content={post?.content} />
              <footer>
                {post?.tags?.length > 0 && <Tags tags={post.tags} />}
              </footer>
            </article>

            <SectionSeparator />
            {morePosts.length > 0 && <MoreStories posts={morePosts} />}
          </>
        ) : null}
      </Container>
    </Layout>
  );
};
export default Post;

export const getStaticPaths = async () => {
  const allPosts = await getAllPostsWithSlug(100);
  const path = allPosts.map((slug) => {
    return slug ? `/posts/${slug}` : "/";
  });
  return {
    paths: path,
    fallback: true,
  };
};

export const getStaticProps = async ({ params, preview = false }) => {
  try {
    const { post, morePosts } = await getPostAndMorePosts(params.slug);
    return {
      props: {
        preview: preview,
        post,
        morePosts: morePosts,
      },
      revalidate: 60,
    };
  } catch (e) {
    return { props: { preview: preview, post: [], morePosts: [] } };
  }
};