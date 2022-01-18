import Link from "next/link";
import Avatar from "../authorComponents/avatar";
import Date from "../generalComponents/date";
import CoverImage from "./cover-image";
import NoImageAvailable from "./noImageAvailable";
import ReactHtmlParser from "react-html-parser";

// PostPreview Component Documentation
// PostPreview Component is a component that is used to display the post preview on the home page.
// It has a title, a cover image, a date, an excerpt and an author.
// It uses ReactHtmlParser to parse provided html.
// It Render Cover Image if it is available else it renders NoImageAvailable component.

const PostPreview = ({ title, coverImage, date, excerpt, author, slug }) => {
  return (
    <div className=" border-2 p-4 mr-5 mb-5">
      <div className="mb-5">
        {coverImage && typeof coverImage == "string" ? (
          <CoverImage title={title} coverImage={coverImage} slug={slug} />
        ) : (
          <NoImageAvailable />
        )}
      </div>

      <h3 className="text-3xl mb-3 leading-snug">
        {slug ? (
          <Link href={`/posts/${slug}`}>
            <a className="hover:underline">{ReactHtmlParser(title)}</a>
          </Link>
        ) : (
          { title }
        )}
      </h3>
      <div className="text-lg mb-4">
        <Date dateString={date} />
      </div>
      <div className="text-lg leading-relaxed mb-4">
        {ReactHtmlParser(excerpt)}
      </div>
      <Avatar author={author} />
    </div>
  );
};

export default PostPreview;
