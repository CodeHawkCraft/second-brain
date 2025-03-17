import { useState } from "react";
import Buttton from "./ui/Button";
import {  useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosArrowDropdown, IoIosLogOut, IoMdClose } from "react-icons/io";
import { GiBrain } from "react-icons/gi";
import { useMyContext } from "../Context/Context";
import { MdOutlineModeEdit } from "react-icons/md";



const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate=useNavigate();
  const {token,username,userLogout,setOpenChangeUserName}=useMyContext();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleNavigation=(e: React.MouseEvent<HTMLButtonElement>)=>{
    const pathName=e.currentTarget.innerHTML;
    if(pathName=='Sign In'){
      navigate('/signin');
    }
    if(pathName=='Sign Up'){
      navigate('/signup');
    }
  }

  return (
    <nav className="border-b  bg-white border-slate-200">
      <div className="py-3 flex relative items-center justify-between px-6 mx-auto max-w-7xl">
        {/* logo and title */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          <GiBrain className="text-primary-500 h-8 w-8" />
          <h2 className="text-2xl font-bold ">
            Second
            <span className="text-primary-500">Brain</span>
          </h2>
        </div>

        {/* login and signup */}
        {!token && (
          <div className="sm:flex hidden gap-3">
            <Buttton
              onClickWithEvent={handleNavigation}
              variant="secondary"
              text="Sign In"
              size="sm"
            />
            <Buttton
              onClickWithEvent={handleNavigation}
              variant="primary"
              text="Sign Up"
              size="sm"
            />
          </div>
        )}

        {/* profile */}
        {token && (
          <div
            className="flex relative items-center cursor-pointer gap-2"
            onClick={() => {
              setIsDropdownOpen(!isDropdownOpen);
            }}
          >
            <img
              src="https://plus.unsplash.com/premium_photo-1739178656557-16b949fea186?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dmVjdG9yJTIwcGVyc29ufGVufDB8fDB8fHww"
              alt="profile"
              className="h-10 w-10 rounded-full object-cover"
            />
            <IoIosArrowDropdown
              className={`w-6 h-6 text-primary-500 transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        )}

        {/* dropdown -> The token check is for when the user logs out; in that case, this div needs to disappear. */}
        {token && (
          <div
            className={`absolute z-[50] w-64 right-4 top-full border  bg-white shadow-lg transition-all duration-200 ${
              isDropdownOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2"
            }`}
          >
            <div
              onClick={() => {
                setOpenChangeUserName(true);
              }}
              className="flex cursor-pointer hover:bg-blue-100 border-b justify-between items-center p-2"
            >
              <p className="w-full flex px-4 py-3"> {username}</p>
              <MdOutlineModeEdit />
            </div>
            <div
              className="flex hover:bg-red-400 hover:text-white  transition-colors cursor-pointer justify-between items-center p-2"
              onClick={() => {
                userLogout();
              }}
            >
              <p className="w-full flex px-4 py-3"> logout</p>
              <IoIosLogOut />
            </div>
          </div>
        )}

        {/* hamburger menu */}
        {!token && (
          <div
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
            className="sm:hidden hover:bg-slate-200 p-2 cursor-pointer rounded-md"
          >
            {!isMenuOpen ? <RxHamburgerMenu /> : <IoMdClose />}
          </div>
        )}
      </div>

      {isMenuOpen && !token && (
        <div className="flex items-center sm:hidden p-3 flex-col gap-3">
          <Buttton
            onClickWithEvent={handleNavigation}
            classes="w-full"
            variant="secondary"
            text="Sign In"
            size="sm"
          />
          <Buttton
            onClickWithEvent={handleNavigation}
              classes="w-full"
            variant="primary"
            text="Sign Up"
            size="sm"
          />
        </div>
      )}
    </nav>
  );
};

export default NavBar;
