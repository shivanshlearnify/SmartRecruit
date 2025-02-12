import React, { useContext, useState } from "react";
import { BiSolidDockRight } from "react-icons/bi";
import { FaSun, FaMoon } from "react-icons/fa";
import ThemeContext from "../../context/ThemeContext";

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="h-full w-auto flex flex-col items-start pt-[25px] pb-[25px] p-2 justify-between">
      <div className="flex items-center">
        {isOpen && (
          <div className="w-[200px] text-2xl text-white">SMART RECRUIT</div>
        )}
        <button onClick={() => setIsOpen(!isOpen)} className="">
          <BiSolidDockRight className="cursor-pointer text-white text-xl" />
        </button>
      </div>
      <div>
        <button
          className="text-white bg-gray-600 py-2 px-3 rounded-2xl"
          onClick={toggleTheme}
        >
          {theme === "light" ? (
            <div className="flex items-center gap-2">
              <FaSun className="text-yellow-300" />
              {isOpen && "Light"}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <FaMoon />
              {isOpen && "Dark"}
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default NavigationBar;
