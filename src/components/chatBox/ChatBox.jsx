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
    setChatData((prev) => inputData ? [...prev, { user: "User", message: inputData }] : [...prev]);
    clearInput();
    setInputData('')
    const formData = new FormData();

    console.log(resumeData);
    const resumeFilesData = convertBase64ToFiles(resumeData)
    console.log(resumeFilesData);
    resumeFilesData?.forEach((file) => {
      formData.append("files", file);
    });

    formData.append("user_input", inputData);

    try {
      const response = await fetch(
        "https://aaf6-106-219-178-92.ngrok-free.app/resume/ats",
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
        theme === "light" ? "bg-gray-50" : "bg-[#262626eb]"
      } shadow-xl rounded-l-xl`}
    >
      <h1
        className={`text-2xl ${
          theme === "light" ? "bg-gray-200" : " bg-neutral-800"
        } rounded-tl-xl py-2 px-2 font-semibold ${
          theme === "light" ? "" : "text-white"
        }`}
      >
        AI
      </h1>
      <div className="flex flex-col px-6 h-[89vh] justify-end">
        <div className="flex flex-col overflow-x-hidden">
          {chatData &&
            chatData.map((chat, index) => (
              <div
                key={index}
                className={`w-fit my-1 flex items-center gap-2 ${
                  chat.user === "AI" ? "self-start" : "self-end"
                }`}
              >
                {chat.user === "AI" && (
                  <h1 className="text-2xl border rounded-full p-2">
                    <RiRobot2Fill />
                  </h1>
                )}
                <h1 className={`${theme === 'light' ? 'bg-gray-200 text-black' : 'bg-neutral-600 text-white'} px-3 py-2 max-w-[80%] rounded-xl`}>
                  <pre className="whitespace-pre-wrap break-words">
                    {chat.message}
                    </pre>
                </h1>
                {chat.user !== "AI" && (
                  <h1 className={`text-2xl border rounded-full p-2`}>
                    <FaUser />
                  </h1>
                )}
              </div>
            ))}
        </div>
        <div className="flex gap-2 my-2">
          <div className={`w-[50vw] flex items-center gap-2 p-2 rounded-full mx-auto ${theme === 'light' ? 'bg-gray-200' : 'bg-neutral-800'}`}>
            <input
              type="text"
              placeholder="Type a message..."
              className={`${theme === 'light' ? 'text-black' : 'text-white'} flex-1 p-2 border-none outline-none rounded-full`}
              onChange={handleChange}
              ref={inputRef}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  console.log("enter");

                  dataApi();
                }
              }}
            />
            <label className="block cursor-pointer">
              <input
                type="file"
                className="hidden"
                onChange={handleUpload}
                multiple
              />
              <span className={`${theme === 'light' ? '' : 'bg-gray-300 p-10'}`}>
                <CgAttachment className={`${theme === 'light' ? 'text-black' : 'text-gray-200'} text-2xl`}/>
              </span>
            </label>
            <button
              className={`px-4 py-2 font-semibold cursor-pointer hover:opacity-[0.75] rounded-full ${theme === 'light' ? 'bg-black text-white' : 'bg-gray-300 text-black'}`}
              onClick={dataApi}
            >
              Send
            </button>
          </div>
          <button
            className="bg-red-500 px-5 py-1 cursor-pointer hover:bg-red-600 text-white rounded-full font-semibold"
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
