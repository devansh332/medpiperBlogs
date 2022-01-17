import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "../../components/generalComponents/container";
import Header from "../../components/generalComponents/header";
import Layout from "../../components/generalComponents/layout";
import { getAllUserDataSlugs, getAuthorDataWithSlug } from "../../lib/api";
import PostTitle from "../../components/blogComponents/post-title";
import Head from "next/head";
import Author from "../../components/authorComponents/author";
import SectionSeparator from "../../components/generalComponents/section-separator";

const AuthorPage = ({ userData, preview }) => {
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
    const userData = await getAuthorDataWithSlug(params.slug);
    return {
      props: {
        preview: preview,
        userData,
      },
    };
  } catch (e) {
    return { props: { preview: preview, userData: [] } };
  }
};
