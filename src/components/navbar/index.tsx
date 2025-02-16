import { ReactComponent as FilledStar } from "@assets/icons/filled-star.svg";
import { ReactComponent as GithubIcon } from "@assets/icons/github-icon.svg";
import "./navbar.styles.css";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="navbarWrapper">
      <Link to="/" className="navLink">
        <GithubIcon />
      </Link>
      <Link to="/starred-repos" className="navLink">
        <FilledStar width={24} height={24} />
      </Link>
    </div>
  );
};

export default Navbar;
