import { isFile } from "./isFile";

export const convertFilesToBase64 = async (files) => {
    try {
      const processedFiles = await Promise.all(
        files.map(async (file) => {
          if (!isFile(file)) {
            return file;
          }
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
  
      return processedFiles;
    } catch (error) {
      console.error("Error while converting files:", error);
      return [];
    }
  };