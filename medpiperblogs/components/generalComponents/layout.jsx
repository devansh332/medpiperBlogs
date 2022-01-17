import Footer from "./footer";
import Meta from "./meta";
import Search from "./search";

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
