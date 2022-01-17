import Image from "next/image";
import React from "react";
import cn from "classnames";

function NoImageAvailable({ title, slug, priority = false }) {
  return (
    <Image
      width={2000}
      height={1000}
      alt={`Cover Image for ${title ? title : ""}`}
      src={"/No_image_available.png"}
      blur="true"
      priority={priority}
      className={cn("shadow-small", {
        "hover:shadow-medium transition-shadow duration-200": slug ? slug : "",
      })}
    />
  );
}

export default NoImageAvailable;
