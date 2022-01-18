import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "../../components/generalComponents/container";
import PostBody from "../../components/blogComponents/post-body";
import MoreStories from "../../components/blogComponents/more-stories";
import Header from "../../components/generalComponents/header";
import PostHeader from "../../components/blogComponents/post-header";
import SectionSeparator from "../../components/generalComponents/section-separator";
import Layout from "../../components/generalComponents/layout";
import { getPostAndMorePosts, getAllPostsSlugs } from "../../lib/apis/postApis";
import PostTitle from "../../components/blogComponents/post-title";
import Head from "next/head";
import Tags from "../../components/blogComponents/tags";

// Post Page Documentation
// Post Page is the page that shows the post.
// Post Page is ISR Page

const Post = ({ post, morePosts }) => {
  const router = useRouter();

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : post?.slug ? (
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
  const allPosts = await getAllPostsSlugs();
  const path = allPosts.map((slug) => {
    return slug ? `/posts/${slug}` : "/";
  });
  return {
    paths: path,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }) => {
  try {
    const { post, morePosts } = await getPostAndMorePosts(params.slug);
    return {
      props: {
        post,
        morePosts: morePosts,
      },
      revalidate: 60,
    };
  } catch (e) {
    return { props: { post: [], morePosts: [] } };
  }
};
