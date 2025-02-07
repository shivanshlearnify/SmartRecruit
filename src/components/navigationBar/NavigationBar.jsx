import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiCloseLargeFill } from "react-icons/ri";

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-full w-auto flex items-start pt-2.5">
      <div className="flex items-center">
        {isOpen && <div className="w-[200px]">Navigation Bar</div>}
        <button onClick={() => setIsOpen(!isOpen)} className="">
          {isOpen ? (
            <RiCloseLargeFill className="cursor-pointer" />
          ) : (
            <GiHamburgerMenu className="cursor-pointer" />
          )}
        </button>
      </div>
    </div>
  );
};

export default NavigationBar;
