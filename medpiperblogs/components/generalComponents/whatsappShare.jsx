import React from "react";
// import next link
import Link from "next/link";
import WhatsAppIcon from "../iconComponents/whatsAppIcons";

// WhatsappShare Component Documentation
// WhatsappShare Component render the share button on the blog.


const WhatsappShare = () => {
  // share current url on whatsapp
  const getShareUrl = () => {
    if (typeof window !== "undefined") {
      const url = window.location.href;
      return url;
    } else {
      return "";
    }
  };
  const shareUrl = `whatsapp://send?text=${getShareUrl()}`;

  return (
    <div className="flex justify-between items-center">
      <span className="hidden md:block">Share</span>

      <div className=" mx-2  flex align-middle justify-center">
        <Link href={`${shareUrl}`}>
          <a className="text-gray-600 hover:text-gray-800">
            <WhatsAppIcon />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default WhatsappShare;
