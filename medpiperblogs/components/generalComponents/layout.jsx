import Footer from "./footer";
import Meta from "./meta";
import Search from "./search";

// Layout Component Documentation
// Layout component is used to wrap the entire page.
// It has a header, footer and main content.
// It also has a search bar and meta tags.

const Layout = ({ preview, children }) => {
  return (
    <>
      <Meta />
      <div className="flex flex-col min-h-screen">
        <div className="flex  flex-row-reverse align-middle w-100">
          <Search />
        </div>

        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
};
export default Layout;
