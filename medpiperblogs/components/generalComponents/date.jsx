import { parseISO, format } from "date-fns";

// Date Component Documentation
// Date Component render the date of the blog.
// Date Component Convert the date from ISO format to a human readable format.

const Date = ({ dateString }) => {
  const date = parseISO(dateString);
  return (
    <>
      {date ? (
        <time dateTime={dateString}>{format(date, "LLLL	d, yyyy")}</time>
      ) : (
        dateString
      )}
    </>
  );
};
export default Date;
