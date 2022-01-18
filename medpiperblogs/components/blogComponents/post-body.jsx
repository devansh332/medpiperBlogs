import styles from "./post-body.module.css";
import ReactHtmlParser from "react-html-parser";

// PostBody Component Documentation
// PostBody Component is a component that is used to display the post body.
// It uses ReactHtmlParser to parse provided html.

const PostBody = ({ content }) => {
  return (
    <>
      {content && (
        <div className="max-w-2xl mx-auto">
          <div className={styles.content}>{ReactHtmlParser(content)}</div>
        </div>
      )}
    </>
  );
};

export default PostBody;
