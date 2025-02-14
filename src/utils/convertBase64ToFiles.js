export const convertBase64ToFiles = (base64Files) => {
    try {
      return base64Files.map((file) => {
        const byteCharacters = atob(file.data.split(",")[1]);
        const byteNumbers = new Uint8Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const blob = new Blob([byteNumbers], { type: file.type });
        return new File([blob], file.name, { type: file.type });
      });
    } catch (error) {
      console.error("Error while converting Base64 to files:", error);
      return [];
    }
  };