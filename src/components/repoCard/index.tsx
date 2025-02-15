import React from "react";
import { responseDataType } from "../../store/store";
import Fork from "../../assets/icons/fork.svg";
import EmptyStar from "../../assets/icons/empty-star.svg";
import "./repoCard.styles.css";

interface IProps {
  data: responseDataType;
  onClick: () => void;
}
const RepoCard: React.FC<IProps> = ({ data, onClick }) => {
  return (
    <div id={data.id.toString()} className="cardRepoWrapper">
      <div className="firstSection">
        <div>
          <span>Title: </span> {data.title}
        </div>
        <div>
          {" "}
          <span>Description: </span>
          {data.description}
        </div>
        <div>
          <span>Owner: </span>
          {data.owner}
        </div>
        <div>
          <button type="button" onClick={onClick}>
            Star
          </button>
        </div>
      </div>
      <div className="secondSection">
        <div className="countSection">
          <span>{data.numberOfForks}</span>
          <Fork />
        </div>
        <div className="countSection">
          <div>{data.numberOfStars}</div>
          <EmptyStar />
        </div>
      </div>
    </div>
  );
};

export default RepoCard;
