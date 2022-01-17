import Image from "next/image";
// import next link
import Link from "next/link";

const Avatar = ({
  author,
  imgWidth = 12,
  imgHeight = 12,
  isNameClickable = true,
}) => {
  const name = author?.name ? author.name : "";
  return (
    <div className="flex items-center">
      {author?.avatar_urls && (
        <div className={`w-${imgWidth} h-${imgHeight} w-8 h-8 relative mr-4`}>
          <Image
            src={author?.avatar_urls}
            layout="fill"
            className="rounded-full"
            alt={name}
          />
          ...
        </div>
      )}
      <div className="text-xl font-bold">
        {author?.slug && isNameClickable ? (
          <Link href={`/author/${author.slug}`}>
            <a className="hover:underline">{name}</a>
          </Link>
        ) : (
          <>{name}</>
        )}
      </div>
    </div>
  );
};
export default Avatar;
