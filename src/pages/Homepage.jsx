import React, { useContext } from "react";
import NavigationBar from "../components/navigationBar/NavigationBar";
import ChatBox from "../components/chatBox/ChatBox";
import ResumeSection from "../components/resumeSection/ResumeSection";
import ThemeContext from "../context/ThemeContext";

const Homepage = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="h-[100vh] max-w-[100vw] overflow-x-hidden gradient-bg flex">
      <NavigationBar />
      <div className={`${theme === 'light' ? 'bg-[rgba(255,255,255,0.7)]' : 'bg-[rgba(0,0,0,0.8)] backdrop-blur-2xl'}  z-10 m-3.5 ml-0 max-w-[95%] rounded-2xl flex`}>
        <ChatBox/>
        <ResumeSection/>
      </div>
    </div>
  );
};

export default Homepage;
