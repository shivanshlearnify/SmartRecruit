import React from "react";
import NavigationBar from "../components/navigationBar/NavigationBar";
import ChatBox from "../components/chatBox/ChatBox";
import ResumeSection from "../components/resumeSection/ResumeSection";

const Homepage = () => {
  return (
    <div className="h-[100vh] max-w-[100vw] overflow-x-hidden bg-[#151718] flex">
      <NavigationBar />
      <div className="bg-white m-3.5 max-w-[95%] rounded-2xl flex">
        <ChatBox/>
        <ResumeSection/>
      </div>
    </div>
  );
};

export default Homepage;
