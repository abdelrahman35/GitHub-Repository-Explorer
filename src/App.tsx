import "./App.css";
import Navbar from "./components/navbar";
import RepoCard from "./components/repoCard";
import SearchInput from "./components/searchInput";
import { useStarredReposManager } from "./store";

function App() {
  const { starRepo, fetchedRepos } = useStarredReposManager();
  return (
    <>
      <Navbar />
      <div>page</div>
      <SearchInput />
      <div>
        {fetchedRepos.data?.map((item) => (
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
              starRepo(item.owner.login, {
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
}

export default App;
