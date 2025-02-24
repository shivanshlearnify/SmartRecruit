import React, { useEffect } from "react";
import Register from "../components/Registration/Register";

const RegisterPage = () => {
  useEffect(() => {
    console.log('hello bro')
  }, []) 
  return (
    <div className="min-h-[100vh] min-w-[100vw]">
      <Register />
    </div>
  );
};

export default RegisterPage;
