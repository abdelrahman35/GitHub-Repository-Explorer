import RepoCard from "@components/repoCard";
import SearchInput from "@components/searchInput";
import { useStarredReposManager } from "@store";
import "./home.styles.css";
const Home = () => {
  const { fetchedRepos, starRepo } = useStarredReposManager();
  return (
    <div className="homeWrapper">
      <div>
        <SearchInput />
      </div>
      <div className="cardsWrapper">
        {fetchedRepos.data.map((item) => {
          const data = {
            id: item.id,
            description: item.description as string,
            numberOfForks: item.forks_count,
            numberOfStars: item.stargazers_count,
            owner: item.owner.login,
            title: item.name,
          };
          return (
            <RepoCard
              key={item.id}
              data={data}
              onClick={() => starRepo(item.owner.login, { ...data })}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
