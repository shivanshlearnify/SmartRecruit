import React, { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { CookieManager } from "../utils/cookie-manager";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const userEmail = CookieManager.getCookie("user_email");
  const storageKey = `chatData_${userEmail}`;

  const [chatData, setChatData] = useState(() => {
    if (userEmail) {
      const savedChats = localStorage.getItem(storageKey);
      return savedChats ? JSON.parse(savedChats) : {};
    }
    return {};
  });

  const [activeChatId, setActiveChatId] = useState(null);

  // Save chatData to localStorage only when it updates and is not empty
  useEffect(() => {
    if (userEmail && Object.keys(chatData).length > 0) {
      localStorage.setItem(storageKey, JSON.stringify(chatData));
    }
  }, [chatData, userEmail]);

  const createNewChat = () => {
    const newChatId = uuidv4();
    setChatData((prev) => {
      const updatedChats = { ...prev, [newChatId]: [] };
      localStorage.setItem(storageKey, JSON.stringify(updatedChats)); // Save immediately
      return updatedChats;
    });
    setActiveChatId(newChatId);
  };

  return (
    <ChatContext.Provider value={{ chatData, setChatData, activeChatId, setActiveChatId, createNewChat }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContext;
