import Link from "next/link";

// Header Component Documentation
// Header Component render the title of the blog.
// Header Component render the link to the blog.


const Header = () => {
  return (
    <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8">
      <Link href="/">
        <a className="hover:underline">MedPiper Blog</a>
      </Link>
      .
    </h2>
  );
};

export default Header;
