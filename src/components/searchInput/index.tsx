import "./searchInput.styles.css";
import SearchIcon from "../../assets/images/search.svg";
import axiosInstance from "../../network/axiosInstance";
import { debounce } from "lodash";
import { useCallback, useState } from "react";
import RepoCard from "../repoCard";
import { Repository } from "../../network/response";
import { useStarredReposManager } from "../../store";

const SearchInput = () => {
  const [result, setResult] = useState<Repository[]>([]);
  const { starRepo, starredRepos } = useStarredReposManager();
  const fetchAllRepos = useCallback(
    debounce(async (keyword: string) => {
      await axiosInstance
        .get("/search/repositories", {
          params: { q: keyword, per_page: 10 },
        })
        .then((res) => {
          setResult(res.data.items);
        });
    }, 500),
    []
  );
  console.log(starredRepos, "starredRepos");
  return (
    <>
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
      <div>
        {result?.map((item) => (
          <RepoCard
            key={item.id}
            data={{
              id: item.id,
              title: item.name,
              description: item.description as string,
              owner: item.owner.login,
              numberOfForks: item.forks_count,
              numberOfStars: item.stargazers_count,
            }}
            onClick={() =>
              starRepo({
                id: item.id,
                title: item.name,
                description: item.description as string,
                owner: item.owner.login,
                numberOfForks: item.forks_count,
                numberOfStars: item.stargazers_count,
              })
            }
          />
        ))}
      </div>
    </>
  );
};

export default SearchInput;
