import Head from "next/head";
import Container from "../components/generalComponents/container";
import Intro from "../components/generalComponents/intro";
import Layout from "../components/generalComponents/layout";
import HeroPost from "../components/postComponents/hero-post";
import MoreStories from "../components/postComponents/more-stories";
import { getFilteredAllPosts } from "../lib/api";

export default function Index({ allPosts, preview }) {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

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
}

export async function getStaticProps({ preview }) {
  const allPosts = await getFilteredAllPosts();

  return {
    props: { allPosts },
  };
}
