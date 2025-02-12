import React, { useContext, useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

import { FaFile } from "react-icons/fa";
import ThemeContext from "../../context/ThemeContext";
import ResumeDataContext from "../../context/ResumeDataContext";

const ResumeSection = () => {
  const { theme } = useContext(ThemeContext);
  const { resumeData, setResumeData } = useContext(ResumeDataContext);

  useEffect(() => {
    console.log(resumeData);
    
    const storingData = async () => {
      
      try {
        const fileDataArray = await Promise.all(
          resumeData.map(async (file) => {
            return new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.readAsDataURL(file); // Convert file to Base64
              reader.onload = () =>
                resolve({
                  name: file.name,
                  type: file.type,
                  data: reader.result,
                });
              reader.onerror = (error) => reject(error);
            });
          })
        );

        localStorage.setItem("resumeData", JSON.stringify(fileDataArray)); // Store in localStorage
        console.log("Files saved successfully:", fileDataArray);
      } catch (error) {
        console.error("Error while saving files:", error);
      }
    };
    storingData();
  }, [resumeData]);

  const handleUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    setResumeData([...resumeData, ...uploadedFiles]);
  };

  const handleDelete = (index) => {
    setResumeData(resumeData.filter((_, i) => i !== index));
  };

  return (
    <div
      className={`max-w-lg mx-auto ${
        theme === "light" ? "bg-[#fdfdfd]" : " bg-[#2f3233]"
      } w-[20%] rounded-r-lg`}
    >
      <h1
        className={`text-2xl ${
          theme === "light" ? "bg-[#efefef]" : " bg-[#2f3233]"
        } rounded-tr-xl py-2 px-2 border-b border-gray-300  ${
          theme === "light" ? "" : "text-white"
        }`}
      >
        Resume
      </h1>
      <h2 className={`py-3 px-2 ${theme === "light" ? "" : "text-white"}`}>
        Upload your resume
      </h2>
      <div className="p-3 rounded-lg">
        <label className="block w-full p-3 border border-dashed border-gray-300 rounded-lg text-center cursor-pointer">
          <input
            type="file"
            className="hidden"
            onChange={handleUpload}
            multiple
          />
          <span
            className={`${theme === "light" ? "text-gray-600" : "text-white"}`}
          >
            Click to upload resume
          </span>
        </label>
        <DropZone theme={theme} />

        <div className="mt-4 space-y-2 flex flex-col gap-1 h-[46vh] overflow-y-auto scrollbar-hide">
          {resumeData?.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-200 rounded-2xl shadow-sm"
            >
              <div className="flex gap-2 items-center">
                <FaFile className="text-black text-xl" />
                <p className="truncate flex-grow">{file.name}</p>
              </div>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => handleDelete(index)}
              >
                <RiDeleteBin6Line className="w-6 h-6 cursor-pointer" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
const DropZone = ({
  theme,
  dragActive,
  onDragOver,
  onDragLeave,
  onDrop,
  inputFileRef,
  handleFileChange,
  removeFileHandler,
}) => (
  <div className="h-full w-full flex justify-center items-center">
    <div
      className={`flex flex-col h-[20vh] items-center justify-center w-full border-[0.104vw] border-dashed rounded-[0.417vw] ${
        dragActive ? "border-blue-500" : "border-gray-300"
      }`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <p
        className={`font-bold ${
          theme === "light" ? "text-gray-600" : "text-white"
        }`}
      >
        Drag & Drop any Document
      </p>
      <p
        className={`text-sm mb-4 ${
          theme === "light" ? "text-gray-500" : "text-white"
        }`}
      >
        (Support doc, txt file, pdf)
      </p>

      {/* Hidden input element */}
      <input
        ref={inputFileRef}
        type="file"
        id="fileInput"
        className="hidden"
        onChange={handleFileChange}
        accept=".doc,.docx,.pdf,application/msword,.txt"
        multiple
      />

      {/* Button to trigger file selection */}
      <button
        onClick={() => inputFileRef.current.click()}
        className={`text-white py-2 px-3 cursor-pointer rounded-lg ${
          theme === "light" ? "bg-black" : "bg-gray-400"
        }`}
      >
        Choose Files
      </button>
    </div>
  </div>
);
export default ResumeSection;
