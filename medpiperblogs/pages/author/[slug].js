import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "../../components/generalComponents/container";
import PostBody from "../../components/postComponents/post-body";
import MoreStories from "../../components/postComponents/more-stories";
import Header from "../../components/generalComponents/header";
import PostHeader from "../../components/postComponents/post-header";
import SectionSeparator from "../../components/generalComponents/section-separator";
import Layout from "../../components/generalComponents/layout";
import {
  getAllPostsWithSlug,
  getAllUserData,
  getAllUserDataSlugs,
  getAuthorDataWithSlug,
  getPostAndMorePosts,
  getUsersData,
} from "../../lib/api";
import PostTitle from "../../components/postComponents/post-title";
import Head from "next/head";
import Tags from "../../components/postComponents/tags";
import Author from "../../components/authorComponents/author";


export default function Post({ userData, preview }) {
  const router = useRouter();

  if (!router.isFallback && !userData?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : userData.slug ? (
          <>
            <article>
              <Head>
                <title>{userData?.name} | Author</title>
                <meta property="og:image" content={userData?.avatar_urls} />
              </Head>
              <Author author={userData} />
            </article>

            <SectionSeparator />
          </>
        ) : null}
      </Container>
    </Layout>
  );
}

export async function getStaticPaths() {
  const allSlugs = await getAllUserDataSlugs(100);

  const path = allSlugs.map((slug) => {
    return slug ? `/author/${slug}` : "/";
  });
  return {
    paths: path,
    fallback: true,
  };
}

export async function getStaticProps({ params, preview = false }) {
  try {
    const userData = await getAuthorDataWithSlug(params.slug);
    return {
      props: {
        preview: preview,
        userData,
      },
    };
  } catch (e) {
    console.log(e);
  }
}
