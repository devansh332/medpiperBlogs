import { parseISO, format } from "date-fns";

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
