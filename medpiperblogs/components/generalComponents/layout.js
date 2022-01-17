import Footer from "./footer.js";
import Meta from "./meta.js";
import Search from "./search.js";

export default function Layout({ preview, children }) {
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
}
