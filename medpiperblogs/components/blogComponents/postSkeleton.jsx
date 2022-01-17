import React from "react";
import ContentLoader, { List } from "react-content-loader";

const PostSkeleton = () => {
  return (
    <ContentLoader viewBox="0 0 100 100">
      {/* Only SVG shapes */}
      <rect x="0" y="0" rx="0" ry="0" width="100" height="40" />
      <rect x="0" y="50" rx="4" ry="4" width="100" height="10" />
      <rect x="0" y="65" rx="3" ry="3" width="25" height="6" />
      <rect x="0" y="75" rx="0" ry="0" width="100" height="3" />
      <rect x="0" y="80" rx="0" ry="0" width="100" height="3" />
      <rect x="0" y="85" rx="0" ry="0" width="100" height="3" />
      <rect x="15" y="92" rx="3" ry="3" width="25" height="6" />
      <circle cx="5" cy="95" r="5" />
    </ContentLoader>
  );
};

export default PostSkeleton;
