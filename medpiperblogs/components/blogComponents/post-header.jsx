import Avatar from "../authorComponents/avatar";
import Date from "../generalComponents/date";
import CoverImage from "./cover-image";
import PostTitle from "./post-title";

import WhatsappShare from "../generalComponents/whatsappShare";

// PostHeader Component Documentation
// PostHeader Component is a component that is used to display the post header on the post page.
// It has a title, a cover image, a date and an author.
// It has a link to the post.
// It uses ReactHtmlParser to parse provided html.

const PostHeader = ({ title, coverImage, date, author, categories }) => {
  return (
    <>
      {title ? <PostTitle>{title}</PostTitle> : ""}

      <div className="flex flex-row justify-between align-middle px-3 mb-2">
        <Avatar author={author} />
        <WhatsappShare />
      </div>

      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} coverImage={coverImage} priority={true} />
      </div>
      <div className="flex flex-row-reverse max-w-2xl mx-auto">
        <div className="text-right mb-6 text-lg">
          Posted <Date dateString={date} />
        </div>
      </div>
    </>
  );
};

export default PostHeader;
