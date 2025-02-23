import { useEffect, useState } from "react";
import "./App.css";
import ThemeContext from "./context/ThemeContext";
import Homepage from "./pages/Homepage";
import ResumeDataContext from "./context/ResumeDataContext";
import RegisterPage from "./pages/RegisterPage";
import { Provider } from "react-redux";
import store from "../store/store";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  Navigate,
} from "react-router";
import LoginPage from "./pages/LoginPage";
import { CookieManager } from "./utils/cookie-manager";
import { ChatProvider } from "./context/ChatContext";

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
  const [cookies, setCookies] = useState();

  useEffect(() => {
    setCookies(() => (CookieManager.getCookie("session_id") ? true : false));
  }, []);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <Provider store={store}>
      <ResumeDataContext.Provider value={{ resumeData, setResumeData }}>
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <ChatProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Navigate to="/register" replace />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/home" element={<Homepage />} />
              </Routes>
            </Router>
          </ChatProvider>
        </ThemeContext.Provider>
      </ResumeDataContext.Provider>
    </Provider>
  );
}

export default App;
