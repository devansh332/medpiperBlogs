import Image from "next/image";
// import next link
import Link from "next/link";

const Avatar = ({
  author,
  imgWidth = 12,
  imgHeight = 12,
  isAuthorNameClickable = true,
}) => {
  const name = author ? author?.name : null;

  return (
    <div className="flex items-center">
      {author?.avatar_urls && (
        <div className={`w-${imgWidth} h-${imgHeight} relative mr-4`}>
          <Image
            src={author.avatar_urls}
            layout="fill"
            className="rounded-full"
            alt={name}
          />
        </div>
      )}
      {isAuthorNameClickable && author?.slug ? (
        <div className="text-xl font-bold">
          <Link href={`/author/${author.slug}`}>
            <a className="hover:underline">{name}</a>
          </Link>
        </div>
      ) : (
        <>
          {name && <div className="text-xl capitalize font-bold">{name}</div>}
        </>
      )}
    </div>
  );
};
export default Avatar;
