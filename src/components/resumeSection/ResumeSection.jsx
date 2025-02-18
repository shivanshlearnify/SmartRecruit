import React, { useContext, useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

import { FaFile } from "react-icons/fa";
import ThemeContext from "../../context/ThemeContext";
import ResumeDataContext from "../../context/ResumeDataContext";
import { convertFilesToBase64 } from "../../utils/convertFilesToBase64";

const ResumeSection = () => {
  const { theme } = useContext(ThemeContext);
  const { resumeData, setResumeData } = useContext(ResumeDataContext);
  const [dragActive, setDragActive] = useState("false");

  useEffect(() => {
    console.log(resumeData);
    localStorage.setItem("resumeData", JSON.stringify(resumeData)); // Store in localStorage
    console.log("Files saved successfully:", resumeData);
  }, [resumeData]);

  const handleUpload = async (event) => {
    const uploadedFiles = Array.from(event.target.files);
    const convertedFiles = await convertFilesToBase64(uploadedFiles);
    console.log(convertedFiles);
    
    setResumeData([...resumeData, ...convertedFiles]);
  };

  const handleDelete = (index) => {
    setResumeData(resumeData.filter((_, i) => i !== index));
  };

  // Handle drag over
  const handleDragOver = (event) => {
    event.preventDefault();
    setDragActive(true);
  };

  // Handle drag leave
  const handleDragLeave = () => {
    setDragActive(false);
  };

  // Handle file drop
  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);
    const uploadedFiles = Array.from(event.dataTransfer.files);
    setResumeData([...resumeData, ...uploadedFiles]);
  };

  return (
    <div
      className={`max-w-[20%] w-[20%] h-full mx-auto ${
        theme === "light" ? "" : ""
      } rounded-r-xl border-none outline-none overflow-hidden`}
    >
      <h1
        className={`text-2xl ${
          theme === "light" ? "" : ""
        } rounded-tr-xl py-2 px-2 font-semibold  ${
          theme === "light" ? "" : "text-white"
        }`}
      >
        Resume
      </h1>
      <div className={`${
        theme === "light" ? "" : ""
      } rounded-xl mr-5 mt-1 h-[90%]`}>
        <h2 className={`py-3 px-2 ${theme === "light" ? "" : "text-white"}`}>
          Upload your resume
        </h2>
        <div className="p-3 rounded-lg">
          <label
            className="block w-full p-3 border border-dashed border-gray-500 rounded-lg text-center cursor-pointer"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              className="hidden"
              onChange={handleUpload}
              multiple
            />
            <div>
              <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                {dragActive ? "Drop files here..." : "Drag & Drop files "}
              </p>
              <p className={`${theme === 'light' ? 'bg-black text-white' : 'bg-gray-300 text-black'} px-2 py-2 rounded-full mt-5 hover:opacity-[0.7]`}>
                Click to Upload
              </p>
            </div>
          </label>

          <div className="mt-6 space-y-1.5 flex flex-col gap-[1px] max-h-[400px] overflow-y-scroll scrollbar-hide">
            {resumeData?.map((file, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-3 min-h-[50px] rounded-full overflow-hidden ${theme === 'light' ? 'bg-[rgba(0,0,0,0.1)]' : 'bg-[rgba(255,255,255,0.08)]'}`}
              >
                <div className="flex gap-1 items-center">
                  <FaFile className={`${theme === 'light' ? 'text-black' : 'text-gray-200'} text-sm`} />
                  <p className={`w-40 not-hover:truncate hover:flex-wrap ${theme === 'light' ? 'text-black' : 'text-gray-200'}`}>{file.name}</p>
                </div>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(index)}
                >
                  <RiDeleteBin6Line className="w-4 h-4 cursor-pointer" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeSection;
