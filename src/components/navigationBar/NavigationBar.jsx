import React, { useContext, useState } from "react";
import { BiSolidDockRight } from "react-icons/bi";
import { FaSun, FaMoon } from "react-icons/fa";
import ThemeContext from "../../context/ThemeContext";
import { createClient } from "@supabase/supabase-js";
import { showErrorToast, showSuccessToast } from "../toast/success-toast";
import { CookieManager } from "../../utils/cookie-manager";
import { useNavigate } from "react-router";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

const NavigationBar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const logoutHandler = async () => {
    const { data, error } = await supabase.auth.signOut();
    console.log('log 1')

    if(error) {
      showErrorToast(error.message)
    } else {
      showSuccessToast("Logged Out!");
      localStorage.removeItem("chatData");
      CookieManager.deleteCookie("session_id");
      navigate('/', {replace: true})
    }
  }

  return (
    <div className={`h-full w-auto max-w-[15vw] flex flex-col items-start pt-[25px] pb-[25px] p-2 justify-between ${isOpen ? 'mx-2' : 'mx-1'}`}>
      <div className="flex items-center">
        {isOpen && (
          <div className="w-[200px] text-2xl text-white">SMART RECRUIT</div>
        )}
        <button onClick={() => setIsOpen(!isOpen)} className="">
          <BiSolidDockRight className="cursor-pointer text-white text-xl" />
        </button>
      </div>
      <div className={`flex flex-col gap-2 items-center w-full`}>
        <button
          className="text-white bg-[rgba(255,255,255,0.07)] hover:bg-[rgba(255,255,255,0.1)] py-2 px-3 w-full flex justify-center rounded-full"
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

        <button onClick={logoutHandler} className={` text-white w-full rounded-full py-2 px-3 cursor-pointer bg-[rgba(255,255,255,0.07)] hover:bg-[rgba(255,255,255,0.1)]`}>
          {isOpen ? "Logout" : "L"}
        </button>
      </div>
    </div>
  );
};

export default NavigationBar;
