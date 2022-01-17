import styles from "./post-body.module.css";

const PostBody = ({ content }) => {
  return (
    <>
      {content && (
        <div className="max-w-2xl mx-auto">
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      )}
    </>
  );
};

export default PostBody;
