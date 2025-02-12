import React from "react";
import NavigationBar from "../components/navigationBar/NavigationBar";
import ChatBox from "../components/chatBox/ChatBox";
import ResumeSection from "../components/resumeSection/ResumeSection";

const Homapage = () => {
  return (
    <div className="h-[100vh] bg-[#151718] flex">
      <NavigationBar />
      <div className="bg-white m-3.5 w-full rounded-lg flex">
        <ChatBox/>
        <ResumeSection/>
      </div>
    </div>
  );
};

export default Homapage;
