import React, { useContext, useEffect, useRef, useState } from "react";
import { CgAttachment } from "react-icons/cg";
import { RiRobot2Fill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";

import ThemeContext from "../../context/ThemeContext";
import ResumeDataContext from "../../context/ResumeDataContext";
import { convertBase64ToFiles } from "../../utils/convertBase64ToFiles";

const ChatBox = () => {
  const { theme } = useContext(ThemeContext);
  const { resumeData, setResumeData } = useContext(ResumeDataContext);
  const inputRef = useRef();
  const [inputData, setInputData] = useState("");
  const [chatData, setChatData] = useState(() => {
    try {
      const savedChats = localStorage.getItem("chatData");

      return savedChats ? JSON.parse(savedChats) : [];
    } catch (error) {
      console.log(error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("chatData", JSON.stringify(chatData));
  }, [chatData]);

  const clearInput = () => {
    inputRef.current.value = "";
  };

  const handleUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    setResumeData([...resumeData, ...uploadedFiles]);
  };

  const handleChange = (event) => {
    setInputData(event.target.value);
  };

  const dataApi = async () => {
    setChatData((prev) => [...prev, { user: "User", message: inputData }]);
    clearInput();
    const formData = new FormData();

    const resumeFilesData = convertBase64ToFiles(resumeData);
    resumeFilesData?.forEach((file) => {
      formData.append("files", file);
    });

    formData.append("user_input", inputData);

    try {
      const response = await fetch(
        "https://b5ab-49-206-8-111.ngrok-free.app/resume/ats ",
        {
          method: "POST",
          headers: {
            "ngrok-skip-browser-warning": "69420",
            // "Content-Type": "application/json",
          },
          body: formData,
        }
      );
      const json = await response.json();
      setChatData((prev) => [...prev, { user: "AI", message: json }]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className={`w-[80%] ${
        theme === "light" ? "bg-[#ffffff]" : "bg-[#2f3233]"
      } shadow-xl border-r-[0.25px] border-r-gray-300 rounded-l-lg`}
    >
      <h1
        className={`text-2xl ${
          theme === "light" ? "bg-[#fefefe]" : " bg-[#2f3233]"
        } rounded-tl-xl py-2 px-2 border-b-[0.25px] border-gray-300  ${
          theme === "light" ? "" : "text-white"
        }`}
      >
        AI
      </h1>
      <div className="flex flex-col px-6 h-[85vh] justify-end items-center">
        <div className="flex flex-col overflow-auto w-[80%]">
          {chatData &&
            chatData.map((chat, index) => (
              <div
                key={index}
                className={`w-fit my-1 flex items-start gap-2 ${
                  chat.user === "AI" ? "self-start" : "justify-end"
                }`}
              >
                {chat.user === "AI" && (
                  <h1 className="text-2xl border rounded-2xl p-2">
                    <RiRobot2Fill />
                  </h1>
                )}
                <h1 className={`${chat.user === "AI" ? "bg-gray-400" : "bg-gray-300"} text-white px-2 py-1 rounded-xl w-[80%]`}>
                  {chat.message}
                </h1>
                {chat.user === "User" && (
                  <h1 className="text-2xl border rounded-2xl p-2">
                    <FaUser />
                  </h1>
                )}
              </div>
            ))}
        </div>
        <div className="flex gap-2">
          <div className="w-[50vw] flex items-center gap-2 p-2 border border-gray-300 rounded-xl shadow-md bg-white mx-auto">
            <input
              type="text"
              placeholder="Type a message..."
              onChange={handleChange}
              ref={inputRef}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  console.log("enter");

                  dataApi();
                }
              }}
              className="flex-1 p-2 border-none outline-none rounded-xl"
            />
            <label className="block cursor-pointer">
              <input
                type="file"
                className="hidden"
                onChange={handleUpload}
                multiple
              />
              <span>
                <CgAttachment className="text-2xl" />
              </span>
            </label>
            <button
              className="px-4 py-2 bg-black text-white rounded-xl cursor-pointer"
              onClick={dataApi}
            >
              Send
            </button>
          </div>
          <button
            className="bg-red-500 px-4 py-2 text-white rounded-xl cursor-pointer"
            onClick={() => {
              setChatData([]);
              localStorage.removeItem("chatData");
            }}
          >
            Clear Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
