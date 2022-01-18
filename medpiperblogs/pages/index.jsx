import Head from "next/head";
import Container from "../components/generalComponents/container";
import Intro from "../components/generalComponents/intro";
import Layout from "../components/generalComponents/layout";
import HeroPost from "../components/blogComponents/hero-post";
import MoreStories from "../components/blogComponents/more-stories";
import { getFilteredAllPosts } from "../lib/apis/postApis";

// Add Index Component Documentation
// Index is the main page of the blog.
// It  have a hero post and a list of more posts.
// It have Intro to the blog listing

const Index = ({ allPosts, preview }) => {
  const heroPost = allPosts.length > 0 && allPosts[0];
  const morePosts = allPosts.length > 1 ? allPosts.slice(1) : [];

  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>Medpiper Blogs</title>
        </Head>
        <Container>
          <Intro />
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.postContentImage}
              date={heroPost.date}
              author={heroPost.userData}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  );
};

export default Index;

export const getStaticProps = async ({ preview }) => {
  const allPosts = await getFilteredAllPosts();

  return {
    props: { allPosts },
  };
};
