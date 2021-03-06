// Tags Component Documentation
// Tags Component render the tags of the blog.

const Tags = ({ tags }) => {
  return (
    <>
      {tags && (
        <div className="max-w-2xl mx-auto">
          <p className="mt-8 text-lg font-bold">
            Tagged
            {tags.map((tag, index) => (
              <span key={index} className="ml-4 font-normal">
                {tag}
              </span>
            ))}
          </p>
        </div>
      )}
    </>
  );
};

export default Tags;
