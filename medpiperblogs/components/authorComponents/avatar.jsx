import Image from "next/image";
// import next link
import Link from "next/link";

const Avatar = ({ author }) => {
  const name = author
    ? author.firstName && author.lastName
      ? `${author.firstName} ${author.lastName}`
      : author.name
    : null;

  return (
    <div className="flex items-center">
      <div className="w-12 h-12 relative mr-4">
        <Image
          src={author.avatar_urls["48"]}
          layout="fill"
          className="rounded-full"
          alt={name}
        />
      </div>
      <div className="text-xl font-bold">
        <Link href={`/author/${author.slug}`}>
          <a className="hover:underline">{name}</a>
        </Link>
      </div>
    </div>
  );
};
export default Avatar;
