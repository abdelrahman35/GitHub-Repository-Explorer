import { debounce } from "lodash";
import { useMemo, useState } from "react";
import { useStarredReposManager } from "@store/index";
import { ReactComponent as CloseIcon } from "@assets/icons/close.svg";
import "./searchInput.styles.css";

const SearchInput = () => {
  const [keyword, setKeyword] = useState("");
  const { fetchRepos, clearFetchedRepos } = useStarredReposManager();
  const fetchAllRepos = useMemo(
    () =>
      debounce(async (keyword: string) => {
        fetchRepos(keyword);
      }, 500),
    [fetchRepos]
  );
  return (
    <div className="searchInput">
      <input
        type="text"
        placeholder="Enter Keyword"
        value={keyword}
        onChange={(e) => {
          const { value } = e.target;
          setKeyword(value);
          if (value) fetchAllRepos(value);
        }}
      />
      <button
        type="button"
        onClick={() => {
          setKeyword("");
          clearFetchedRepos();
        }}
      >
        <CloseIcon />
      </button>
    </div>
  );
};

export default SearchInput;
