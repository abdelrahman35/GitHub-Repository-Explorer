import React from "react";
import { responseDataType } from "../../store/store";
import Fork from "../../assets/icons/fork.svg";
import EmptyStar from "../../assets/icons/empty-star.svg";
import FilledStar from "../../assets/icons/filled-star.svg";
import StarsCounter from "../../assets/icons/stars-counter.svg";
import "./repoCard.styles.css";
import { useStarredReposManager } from "../../store";

interface IProps {
  data: responseDataType;
  onClick: () => void;
}
const RepoCard: React.FC<IProps> = ({ data, onClick }) => {
  const { starredRepos } = useStarredReposManager();
  const isRepoStarred = starredRepos.data.find((item) => item.id === data.id);
  return (
    <div id={data.id.toString()} className="cardRepoWrapper">
      <div className="sectionsWrapper">
        <div className="firstSection">
          {" "}
          <div>
            <span>Title: </span> {data.title}
          </div>
          <div>
            <span>Owner: </span>
            {data.owner}
          </div>
          <div>
            {" "}
            <span>Description: </span>
            {data.description}
          </div>
        </div>

        <div className="secondSection">
          <div className="countSection">
            <span>{data.numberOfForks}</span>
            <Fork />
          </div>
          <div className="countSection">
            <div>{data.numberOfStars}</div>
            <StarsCounter />
          </div>
        </div>
      </div>
      <div>
        <div>
          <button type="button" onClick={onClick}>
            {isRepoStarred ? <FilledStar /> : <EmptyStar />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RepoCard;
