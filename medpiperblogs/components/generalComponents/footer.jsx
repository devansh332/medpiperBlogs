import Container from "./container";
import { githubRepoUrl } from "../../lib/constants";

// Footer Component Documentation
// Footer is the footer of the blog.
// It have a link to the github repository.
// It has Footer Slogan.
// It is used in the Layout component.


const Footer = () => {
  
  return (
    <footer className="bg-accent-1 border-t border-accent-2">
      <Container>
        <div className="py-28 flex flex-col lg:flex-row items-center">
          <h3 className="text-4xl lg:text-5xl font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
            MedPipers Bringing you New Blogs all the time
          </h3>
          <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2">
            <a
              href={`${githubRepoUrl}`}
              className="mx-3 font-bold hover:underline"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};
export default Footer;
