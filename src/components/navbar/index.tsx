import { useState } from "react";
import BurgerMenu from "../../assets/icons/burger-menu.svg";
import CloseIcon from "../../assets/icons/close.svg";
import FilledStar from "../../assets/icons/filled-star.svg";
import "./navbar.styles.css";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-[#fff5ff]">
      <div className="hidden md:flex justify-between items-center p-6">
        <h1 className="text-2xl font-bold hover:text-[#aa0082]">Home</h1>
        <div className="flex items-center gap-2 text-xl">
          <a href="/" className="hover:text-[#aa0082]">
            Search
          </a>
          <a href="/" className="hover:text-[#aa0082]">
            <FilledStar />
          </a>
        </div>
      </div>
      {/* responsive navbar */}
      <div className="md:hidden flex-col justify-between p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold hover:text-[#aa0082]">Home</h1>

          <button onClick={() => setOpen(!open)}>
            {open ? <CloseIcon /> : <BurgerMenu />}
          </button>
        </div>
        {open && (
          <div className="flex flex-col gap-4">
            <div>
              <hr />
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <a href="/" className="hover:text-[#aa0082]">
                Search
              </a>
              <a href="/" className="hover:text-[#aa0082]">
                Starred Repos
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
