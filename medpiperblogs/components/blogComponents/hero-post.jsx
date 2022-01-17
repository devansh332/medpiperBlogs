import Avatar from "../authorComponents/avatar";
import Date from "../generalComponents/date";
import CoverImage from "./cover-image";
import Link from "next/link";

const HeroPost = ({ title, coverImage, date, excerpt, author, slug }) => {
  const PostTitle = title ? title : "";
  const PostSlug = slug ? slug : "";
  return (
    <section>
      <div className="mb-8 md:mb-16">
        {coverImage && (
          <CoverImage
            title={PostTitle}
            coverImage={coverImage}
            slug={PostSlug}
            priority={true}
          />
        )}
      </div>
      <div className="md:grid md:grid-cols-2 md:col-gap-16 lg:col-gap-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
            {PostSlug ? (
              <Link href={`/posts/${slug}`}>
                <a
                  className="hover:underline"
                  dangerouslySetInnerHTML={{ __html: title }}
                />
              </Link>
            ) : (
              { title }
            )}
          </h3>
          {date && (
            <div className="mb-4 md:mb-0 text-lg">
              <Date dateString={date} />
            </div>
          )}
        </div>
        <div>
          <div
            className="text-lg leading-relaxed mb-4"
            dangerouslySetInnerHTML={{ __html: excerpt }}
          />
          <Avatar author={author} />
        </div>
      </div>
    </section>
  );
};

export default HeroPost;
