import React from "react";
import { responseDataType } from "../../types/store";
import { ReactComponent as Fork } from "@assets/icons/fork.svg";
import { ReactComponent as EmptyStar } from "@assets/icons/empty-star.svg";
import { ReactComponent as FilledStar } from "@assets/icons/filled-star.svg";
import { ReactComponent as StarsCounter } from "@assets/icons/stars-counter.svg";
import { useStarredReposManager } from "@store/index";
import "./repoCard.styles.css";

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
