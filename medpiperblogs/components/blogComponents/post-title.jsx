import ReactHtmlParser from "react-html-parser";

// PostTitle Component Documentation
// PostTitle Component is a component that is used to display the post title.
// It uses ReactHtmlParser to parse provided html.

const PostTitle = ({ children }) => {
  return (
    <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left">
      {ReactHtmlParser(children)}
    </h1>
  );
};

export default PostTitle;
