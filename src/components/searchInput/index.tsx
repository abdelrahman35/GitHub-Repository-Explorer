import "./searchInput.styles.css";
import SearchIcon from "../../assets/icons/search.svg";
import { debounce } from "lodash";
import { useEffect, useMemo } from "react";
import { useStarredReposManager } from "../../store";

const SearchInput = () => {
  const { fetchRepos, fetchedRepos } = useStarredReposManager();
  const fetchAllRepos = useMemo(
    () =>
      debounce(async (keyword: string) => {
        fetchRepos(keyword);
      }, 500),
    [fetchRepos]
  );
  useEffect(() => {
    console.log(fetchedRepos, "fetchedRepos");
  }, [fetchedRepos]);

  return (
    <div className="searchInput">
      <input
        type="text"
        placeholder="Enter Keyword"
        onChange={(e) => {
          const { value } = e.target;
          if (value) fetchAllRepos(value);
        }}
      />
      <button type="button">
        <SearchIcon />
      </button>
    </div>
  );
};

export default SearchInput;
