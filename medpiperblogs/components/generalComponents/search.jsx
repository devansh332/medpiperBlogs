import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { postSearchApiBaseUrl } from "../../lib/constants";

// search component Documentation
// search component have searchRef as a ref to the search input
// search component have onChangeHandler as a function to handle the change event
// search component have onFocusHandler as a function to handle the focus event
// search component have onTitleHandler as a function to handle the click event
// search component have outSideClickHandler as a function to handle the click event
// search component have searchEndpoint as a function to handle the search endpoint
// search component provide link to post slug to the post

const Search = () => {
  // all the states are declared here
  const searchRef = useRef(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(false);
  const [results, setResults] = useState([]);
  const timeout = useRef(null);

  const searchEndpoint = (query) =>
    // searchEndpoint returns a updated query url
    `${postSearchApiBaseUrl}?search=${query}&_fields=slug,title`;

  const onChangeHandler = (event) => {
    // onChangeHandler handles the change event
    // onChangeHandler sets the query state to the value of the input
    // onChangeHandler fetch the search endpoint with the updated query
    // onChangeHandler is debounced to prevent multiple calls

    clearTimeout(timeout.current);
    const query = event.target.value;
    setQuery(query);
    if (query.length) {
      timeout.current = setTimeout(() => {
        fetch(searchEndpoint(query))
          .then((res) => res.json())
          .then((res) => {
            if (res.length > 0) {
              setResults([...res]);
            }
          });
      }, 500);
    } else {
      // if the query is empty then set the results to empty array

      setResults([]);
    }
  };
  const onTitleHandler = useCallback(() => {
    // onTitleHandler handles the click event
    // onTitleHandler sets the query state to empty value
    // onTitleHandler sets the results state to empty array
    // onTitleHandler sets the active state to false

    setQuery("");
    setActive(false);
    setResults([]);
  }, []);

  const onFocusHandler = useCallback(() => {
    // onFocusHandler handles the focus event
    // onFocusHandler sets the active state to true

    setActive(true);
    window.addEventListener("click", outSideClickHandler);
  }, []);

  const outSideClickHandler = useCallback((event) => {
    // outSideClickHandler handles the click event
    // outSideClickHandler sets the active state to false
    // outSideClickHandler removes the click event listener

    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setActive(false);
      window.removeEventListener("click", outSideClickHandler);
    }
  }, []);
  return (
    <div
      className="flex w-100 flex-col pt-2 mx-auto sm:mx-auto md:mx-20  text-gray-600 "
      ref={searchRef}
    >
      <input
        className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
        onChange={onChangeHandler}
        onFocus={onFocusHandler}
        placeholder="Search posts"
        type="text"
        value={query}
      />
      {active && query && results?.length > 0 && (
        <div>
          <ul className="flex flex-col justify-center absolute text-xs z-10 ">
            {results.map(({ slug = "", title = "" }) => (
              <>
                {slug && (
                  <li
                    className="p-4 truncate max-w-xs h-10 bg-white border"
                    key={slug}
                  >
                    <Link href="/posts/[slug]" as={`/posts/${slug}`}>
                      <a onClick={onTitleHandler}>
                        {title?.rendered ? title?.rendered : ""}
                      </a>
                    </Link>
                  </li>
                )}
              </>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
