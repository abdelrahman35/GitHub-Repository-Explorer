import RepoCard from "@components/repoCard";
import { useStarredReposManager } from "@store";
import "./starredRepos.styles.css";

const StarredReposPage = () => {
  const { starredRepos, starRepo } = useStarredReposManager();
  return (
    <div className="starredReposPageContainer">
      {starredRepos.data.length === 0 ? (
        <div className="emptyState">There is no starred repos found</div>
      ) : (
        <div className="">
          {" "}
          {starredRepos.data.map((item) => (
            <RepoCard
              key={item.id}
              data={{
                ...item,
              }}
              onClick={() => starRepo(item.owner, { ...item })}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default StarredReposPage;
