import FilledStar from "../../assets/icons/filled-star.svg";
import GithubIcon from "../../assets/icons/github-icon.svg";
import "./navbar.styles.css";
const Navbar = () => {
  return (
    <div className="navbarWrapper">
      <div className="hidden md:flex justify-between items-center p-6">
        <h1 className="text-2xl font-bold hover:text-[#aa0082]">
          <a href="/">
            <GithubIcon />
          </a>
        </h1>
        <div className="flex items-center gap-2 text-xl">
          <a href="/starred-repos" className="hover:text-[#aa0082]">
            <FilledStar />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
