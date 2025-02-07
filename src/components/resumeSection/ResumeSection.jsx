import React, { useState } from "react";
import { MdClose } from "react-icons/md";

const ResumeSection = () => {
  const [files, setFiles] = useState([]);

  const handleUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    setFiles([...files, ...uploadedFiles]);
  };

  const handleDelete = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-gray-200 w-[20%] rounded-r-lg">
        <h1 className="text-4xl">Resume</h1>
        <h2>Upload your resume</h2>
      <div className="bg-white p-3 rounded-lg">
        <label className="block w-full p-3 border border-dashed border-gray-300 rounded-lg text-center cursor-pointer">
          <input
            type="file"
            className="hidden"
            onChange={handleUpload}
            multiple
          />
          <span className="text-gray-600">Click to upload resume</span>
        </label>

        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 border rounded-lg shadow-sm"
            >
              <p className="truncate flex-grow">{file.name}</p>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => handleDelete(index)}
              >
                <MdClose className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResumeSection;
