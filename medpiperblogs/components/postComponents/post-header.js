import Avatar from "../authorComponents/avatar";
import Date from "../generalComponents/date";
import CoverImage from "./cover-image";
import PostTitle from "../postComponents/post-title";
import Categories from "../generalComponents/categories";
import WhatsappShare from "../generalComponents/whatsappShare";

export default function PostHeader({
  title,
  coverImage,
  date,
  author,
  categories,
}) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="flex flex-row justify-between">
        <Avatar author={author} />
        <WhatsappShare />
      </div>

      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} coverImage={coverImage} />
      </div>
      <div className="flex flex-row-reverse max-w-2xl mx-auto">
        <div className="text-right mb-6 text-lg">
          Posted <Date dateString={date} />
          {/* <Categories categories={categories} /> */}
        </div>
      </div>
    </>
  );
}
