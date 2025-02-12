import { useEffect, useState } from "react";
import "./App.css";
import ThemeContext from "./context/ThemeContext";
import Homapage from "./pages/Homapage";
import ResumeDataContext from "./context/ResumeDataContext";

function App() {
  const [theme, setTheme] = useState("light");
  const [resumeData, setResumeData] = useState(() => {
    try {
      const storedFiles = localStorage.getItem("resumeData");
      return storedFiles ? JSON.parse(storedFiles) : [];
    } catch (error) {
      console.error("Error retrieving files:", error);
      return [];
    }
  });
  

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <ResumeDataContext.Provider value={{resumeData, setResumeData}}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <Homapage />
      </ThemeContext.Provider>
    </ResumeDataContext.Provider>
  );
}

export default App;
