import styles from "./post-body.module.css";
import ReactHtmlParser from "react-html-parser";

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
