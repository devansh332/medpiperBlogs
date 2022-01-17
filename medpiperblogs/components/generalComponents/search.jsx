import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import SearchBarIcon from "../iconComponents/searchBarIcon";
// import styles from "./search.module.css";

const Search = () => {
  const searchRef = useRef(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(false);
  const [results, setResults] = useState([]);

  const searchEndpoint = (query) =>
    `https://journomed.com/wp-json/wp/v2/posts?search=${query}&_fields=slug,title`;

  const onChangeHandler = (event) => {
    const query = event.target.value;
    setQuery(query);
    if (query.length) {
      fetch(searchEndpoint(query))
        .then((res) => res.json())
        .then((res) => {
          setResults([...res]);
        });
    } else {
      setResults([]);
    }
  };
  const onTitleHandler = useCallback(() => {
    setQuery("");
    setActive(false);
    setResults([]);
  }, []);

  const onFocusHandler = useCallback(() => {
    setActive(true);
    window.addEventListener("click", outSideClickHandler);
  }, []);

  const outSideClickHandler = useCallback((event) => {
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
      {active && results?.length > 0 && (
        <div>
          <ul className="flex flex-col justify-center absolute text-xs z-10 ">
            {results.map(({ slug, title }) => (
              <li
                className="p-4 truncate max-w-xs h-10 bg-white border"
                key={slug}
              >
                <Link href="/posts/[slug]" as={`/posts/${slug}`}>
                  <a onClick={onTitleHandler}>{title.rendered}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
