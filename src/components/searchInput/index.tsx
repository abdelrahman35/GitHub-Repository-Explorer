import "./searchInput.styles.css";
import SearchIcon from "../../assets/images/search.svg";
import axiosInstance from "../../network/axiosInstance";
import { debounce } from "lodash";
import { useCallback, useState } from "react";
const SearchInput = () => {
  const [result, setResult] = useState([]);
  const fetchAllRepos = useCallback(
    debounce(async (keyword: string) => {
      const resp = await axiosInstance.get("/search/repositories", {
        params: { q: keyword, per_page: 10 },
      });
      setResult(resp.data.items);
    }, 500),
    []
  );

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
