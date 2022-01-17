import cn from "classnames";
import Image from "next/image";
import Link from "next/link";
import NoImageAvailable from "./noImageAvailable";

const CoverImage = ({ title, coverImage, slug, priority = false }) => {
  const image = coverImage ? (
    <Image
      width={2000}
      height={1000}
      alt={`Cover Image for ${title ? title : ""}`}
      src={coverImage}
      blur="true"
      priority={priority}
      className={cn("shadow-small", {
        "hover:shadow-medium transition-shadow duration-200": slug ? slug : "",
      })}
    />
  ) : (
    <NoImageAvailable />
  );
  return (
    <div className="sm:mx-0">
      {image ? (
        <>
          {slug ? (
            <Link href={`/posts/${slug}`}>
              <a aria-label={title ? title : ""}>{image}</a>
            </Link>
          ) : (
            image
          )}
        </>
      ) : (
        "Unable to render image"
      )}
    </div>
  );
};
export default CoverImage;
