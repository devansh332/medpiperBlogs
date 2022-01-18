import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "../../components/generalComponents/container";
import Header from "../../components/generalComponents/header";
import Layout from "../../components/generalComponents/layout";
import {
  getAllUserDataSlugs,
  getAllUserData,
  getAuthorDataWithSlugAndMorePosts,
} from "../../lib/apis/authorApis";
import PostTitle from "../../components/blogComponents/post-title";
import Head from "next/head";

import SectionSeparator from "../../components/generalComponents/section-separator";
import Avatar from "../../components/authorComponents/avatar";
import MoreStories from "../../components/blogComponents/more-stories";
import { MORE_STORY_TITLE_BY_AUTHOR } from "../../lib/constants";

// AuthorPage Page Documentation
// AuthorPage Page is the page that shows the author's posts.
 // AuthorPage is ISR Page
 


const AuthorPage = ({ userData, morePosts, preview }) => {
  const router = useRouter();

  if (!router.isFallback && !userData?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  const infiniteScrollFilter = userData?.id ? { author: userData.id } : {};

  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : userData?.slug ? (
          <>
            <article>
              <Head>
                <title>{userData?.name} | Author</title>
                <meta property="og:image" content={userData?.avatar_urls} />
              </Head>
              <Avatar
                author={userData}
                imgHeight={24}
                imgWidth={24}
                isNameClickable={false}
              />
            </article>

            <SectionSeparator />
            {morePosts.length > 0 && (
              <MoreStories
                posts={morePosts}
                moreStoryTitle={MORE_STORY_TITLE_BY_AUTHOR}
                filter={infiniteScrollFilter}
              />
            )}
          </>
        ) : null}
      </Container>
    </Layout>
  );
};

export default AuthorPage;

export const getStaticPaths = async () => {
  const allSlugs = await getAllUserDataSlugs(100);

  const path = allSlugs.map((slug) => {
    return slug ? `/author/${slug}` : "/";
  });
  return {
    paths: path,
    fallback: true,
  };
};

export const getStaticProps = async ({ params, preview = false }) => {
  try {
    const { userData, morePosts } = await getAuthorDataWithSlugAndMorePosts(
      params.slug
    );

    return {
      props: {
        preview: preview,
        userData,
        morePosts,
      },
    };
  } catch (e) {
    return { props: { preview: preview, userData: [] } };
  }
};
