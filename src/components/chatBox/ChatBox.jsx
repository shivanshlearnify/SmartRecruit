import React, { useContext, useEffect, useRef, useState } from "react";
import { CgAttachment } from "react-icons/cg";
import { RiRobot2Fill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";

import ThemeContext from "../../context/ThemeContext";
import ResumeDataContext from "../../context/ResumeDataContext";
import { convertBase64ToFiles } from "../../utils/convertBase64ToFiles";
import { CookieManager } from "../../utils/cookie-manager";

const ChatBox = () => {
  const { theme } = useContext(ThemeContext);
  const { resumeData, setResumeData } = useContext(ResumeDataContext);
  const inputRef = useRef();
  const userEmail = CookieManager.getCookie('user_email');
  const [inputData, setInputData] = useState("");
  const [chatData, setChatData] = useState(() => {
    try {
      const savedChats = localStorage.getItem(`chatData_${userEmail}`);

      return savedChats ? JSON.parse(savedChats) : [];
    } catch (error) {
      console.log(error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(`chatData_${userEmail}`, JSON.stringify(chatData));
    console.log("message", chatData);
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
    setChatData((prev) =>
      inputData ? [...prev, { user: "User", message: inputData }] : [...prev]
    );
    clearInput();
    setInputData("");
    const formData = new FormData();

    console.log(resumeData);
    const resumeFilesData = convertBase64ToFiles(resumeData);
    console.log(resumeFilesData);
    resumeFilesData?.forEach((file) => {
      formData.append("files", file);
    });

    formData.append("user_input", inputData);
    formData.append("user_token", CookieManager.getCookie("session_id"));

    try {
      const response = await fetch(
        "https://39be-106-219-179-48.ngrok-free.app/resume/ats",
        {
          method: "POST",
          headers: {
            "ngrok-skip-browser-warning": "69420",
            // "Content-Type": "application/json",
            Authorization: `Bearer ${CookieManager.getCookie("session_id")}`,
          },
          body: formData,
        }
      );

      const json = await response.json();
      console.log("response", typeof json);
      setChatData((prev) => [...prev, { user: "AI", message: json }]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className={`w-[80%] h-full ${theme === "light" ? "" : ""} rounded-l-xl`}
    >
      <div className={`flex justify-between mx-4 mr-6 h-[80px] items-center`}>
        <h1
          className={`text-2xl ${
            theme === "light" ? "" : ""
          } rounded-tl-xl py-2 px-2 font-semibold ${
            theme === "light" ? "" : "text-white"
          }`}
        >
          AI
        </h1>

        <div
          className={`p-[1px] cursor-pointer hover:opacity-[0.6] gradient-btn2 rounded-xl`}
        >
          <button
            className={`${
              theme === "light" ? "bg-white" : "bg-black"
            } w-[120px] h-[50px] cursor-pointer rounded-xl font-semibold`}
            onClick={() => {
              setChatData([]);
              localStorage.removeItem("chatData");
            }}
          >
            <span className="gradient-btnText text-transparent bg-clip-text text-lg">
              New Chat
            </span>
          </button>
        </div>
      </div>
      <div className="flex flex-col h-[85vh] justify-end">
        <div
          className={`${
            theme === "light"
              ? "bg-[rgba(0,0,0,0.06)]"
              : "bg-[rgba(255,255,255,0.1)]"
          } flex flex-col rounded-xl mx-5 my-1.5 px-[100px] py-[30px] h-full scrollBar overflow-x-hidden`}
        >
          {chatData &&
            chatData.map((chat, index) => (
              <div
                key={index}
                className={`w-fit my-1 flex items-center gap-2 ${
                  chat.user === "AI" ? "self-start" : "self-end"
                }`}
              >
                {chat.user === "AI" && (
                  <h1
                    className={`text-xs border rounded-full p-1.5 ml-3 ${
                      theme === "light" ? "border-black" : "border-white"
                    }`}
                  >
                    <RiRobot2Fill
                      className={`${
                        theme === "light" ? "text-black" : "text-white"
                      }`}
                    />
                  </h1>
                )}
                <div
                  className={`${
                    theme === "light"
                      ? "bg-white text-black"
                      : "bg-black text-white"
                  } ${
                    chat.user === "AI"
                      ? "p-[15px] min-w-[80%]"
                      : "px-3 py-2 !bg-none"
                  }  max-w-[80%] rounded-xl`}
                >
                  {chat.user === "AI" ? (
                    <>
                      <p className="mb-4 font-normal">{chat.message.answer}</p>{" "}
                      {chat.message.table && (
                        <div className="w-full flex justify-center">
                          <div className={`${theme === 'light' ? 'border-[rgba(0,0,0,0.06)]': 'border-[rgba(255,255,255,0.1)]'} overflow-hidden rounded-xl border max-w-full min-w-[60%]`}>
                            <table className="w-full border-collapse">
                              <thead>
                                <tr className={`${theme === 'light' ? 'bg-[rgba(0,0,0,0.06)]': 'bg-[rgba(255,255,255,0.1)]'} `}>
                                  {chat.message?.table?.columns.map(
                                    (col, index) => (
                                      <th
                                        key={index}
                                        className={`${theme === 'light' ? 'border-[rgba(0,0,0,0.06)]': 'border-[rgba(255,255,255,0.2)]'} border p-3 text-left`}
                                      >
                                        {col}
                                      </th>
                                    )
                                  )}
                                </tr>
                              </thead>
                              <tbody>
                                {chat.message?.table?.data.map(
                                  (row, rowIndex) => (
                                    <tr
                                      key={rowIndex}
                                      className={`${theme === 'light' ? 'hover:bg-[rgba(0,0,0,0.06)]': 'hover:bg-[rgba(255,255,255,0.1)]'} `}
                                    >
                                      {row.map((cell, cellIndex) => (
                                        <td
                                          key={cellIndex}
                                          className={`${theme === 'light' ? 'border-[rgba(0,0,0,0.06)]': 'border-[rgba(255,255,255,0.2)]'}  border p-2`}
                                        >
                                          {cell}
                                        </td>
                                      ))}
                                    </tr>
                                  )
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <>{chat.message}</>
                  )}
                </div>
                {chat.user !== "AI" && (
                  <h1
                    className={`text-xs border rounded-full p-1.5 mr-3  ${
                      theme === "light" ? "border-black" : "border-white"
                    }`}
                  >
                    <FaUser
                      className={`${
                        theme === "light" ? "text-black" : "text-white"
                      }`}
                    />
                  </h1>
                )}
              </div>
            ))}
        </div>

        <div className="flex gap-2 my-2 mx-5 items-center">
          <div
            className={`w-full flex items-center gap-2 p-2 rounded-xl mx-auto border-1 ${
              theme === "light" ? "border-gray-500" : "border-gray-400"
            }`}
          >
            <input
              type="text"
              placeholder="Type a message..."
              className={`${
                theme === "light" ? "text-black" : "text-white"
              } flex-1 p-2 border-none outline-none rounded-xl`}
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
              <span
                className={`${theme === "light" ? "" : "bg-gray-300 p-10"}`}
              >
                <CgAttachment
                  className={`${
                    theme === "light" ? "text-black" : "text-gray-200"
                  } text-2xl`}
                />
              </span>
            </label>
            <button
              className={`px-4 py-2 font-semibold cursor-pointer hover:opacity-[0.75] rounded-xl gradient-btn ${
                theme === "light"
                  ? "bg-black text-white"
                  : "bg-gray-300 text-white"
              }`}
              onClick={dataApi}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
