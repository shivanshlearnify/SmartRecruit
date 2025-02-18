import React, { useEffect, useState } from "react";
//import CheckBox from './buttons/CheckBox';
//import { FaUser, FaLock } from "react-icons/fa";
//import { MdEmail } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  setUsername,
  setEmail,
  setPassword,
} from "../../../store/actions/RegisterUserAction";
//import { getApiConfig, getApiHeaders } from '@/utility/api-config';
import { CookieManager } from "../../utils/cookie-manager";
import { showErrorToast, showSuccessToast } from "../toast/success-toast";
import { createClient } from "@supabase/supabase-js";
import { Link, useNavigate } from "react-router";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { username, email, password } = useSelector((state) => state.user);

  const validateForm = () => {
    //const emailRegex = /^[a-zA-Z0-9._%+-]+@smartitframe\.com$/;
    //if (!emailRegex.test(email)) {
      //showErrorToast(
       // "Invalid email! Only '@smartitframe.com' domain is allowed."
      //);
      //return false;
    //}
    if (password.length < 6) {
      showErrorToast("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  const registerHandler = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (username && email && password) {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        console.error("Sign up error:", error.message);
      } else {
        showSuccessToast(
          "We have sent you a verification email. Please follow the steps in the email to log in."
        );
        navigate("/login");
      }
    } else {
      alert("Please fill all fields and agree to the terms");
    }
  };

  return (
    <div className="w-[100%] h-[85vh] flex justify-between items-center gap-[2vw] py-[2vw] px-[5vw]">
      <div className="min-w-[50%]">
        <img className="w-[100%]" src="/public/images/logo.svg" alt="Kayzen" />
      </div>

      <div className="w-[50%] flex-col items-center">
        <div className="logo w-full h-[3vh] flex items-center justify-center mb-[35px]">
          <img
            className="w-[2.2vw]"
            src="/public/images/logo.svg"
            alt="Kayzen"
          />
          <h1 className="text-[20px] uppercase font-semibold">Kayzen</h1>
        </div>

        <div className="w-full h-[40vh]">
          <form className="w-full h-full flex flex-col justify-start items-center gap-[1.5vw]">
            <FormInput
              label="Username"
              value={username}
              onChange={(e) => dispatch(setUsername(e.target.value))}
              type="text"
              placeholder="Enter Username"
              id="username"
            />
            <FormInput
              label="Email"
              value={email}
              onChange={(e) => dispatch(setEmail(e.target.value))}
              type="email"
              placeholder="Enter Email"
              id="email"
            />
            <FormInput
              label="Password"
              value={password}
              onChange={(e) => dispatch(setPassword(e.target.value))}
              type="password"
              placeholder="Enter Password"
              id="password"
            />

            <button
              onClick={registerHandler}
              className="bg-[#630063] text-white px-4 py-2 rounded-md cursor-pointer hover:bg-opacity-0.3"
            >
              Register
            </button>
            <h6 className="capitalize font-semibold">
              already have an account ?{" "}
              <Link to={"/login"} className="text-[#630063]">
                Log in
              </Link>
            </h6>
          </form>
        </div>
      </div>
    </div>
  );
};

const FormInput = ({ label, icon, value, onChange, type, placeholder, id }) => (
  <div className="flex items-center justify-center w-full">
    <div className="flex flex-col items-start">
      <label className="capitalize Hmd font-medium" htmlFor={id}>
        {label}
      </label>
      <div className="flex items-center relative">
        {icon}
        <input
          value={value}
          onChange={onChange}
          type={type}
          className="border border-zinc-300 rounded-lg w-[30vw] h-[5vh] pl-[3vw] pr-[1vw]"
          placeholder={placeholder}
          id={id}
          aria-label={label}
          required
        />
      </div>
    </div>
  </div>
);

export default Register;
