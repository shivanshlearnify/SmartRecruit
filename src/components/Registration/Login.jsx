"use client";
//import { motion } from "framer-motion";
import React from "react";
//import GradientButton from "./buttons/GradientButton";
//import { FaLock } from "react-icons/fa";
//import { MdEmail } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  setEmail,
  setPassword,
  setShowLogin,
  setFadeIn,
} from "../../../store/actions/RegisterUserAction";
//import { useRouter } from "next/navigation";
import { CookieManager } from "../../utils/cookie-manager";
import { showErrorToast } from "../toast/success-toast";
import { createClient } from "@supabase/supabase-js";
import { Link, useNavigate } from "react-router";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, password } = useSelector((state) => state.user);

  const validateForm = () => {
    //const emailRegex = /^[a-zA-Z0-9._%+-]+@smartitframe\.com$/;
    //if (!emailRegex.test(email)) {
      //showErrorToast(
       // "Invalid email! Only '@smartitframe.com' domain is allowed."
     // );
     // return false;
  //  }
    if (password.length < 6) {
      showErrorToast("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (email && password) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        showErrorToast(error.message);
      } else {
        CookieManager.setCookie("session_id", data.session.access_token);
        CookieManager.setCookie("user_email", data.user.email);
        setTimeout(() => {
          navigate("/home", { replace: true });
        }, 1000);
      }
    } else {
      // Handle client-side validation errors here
      console.error("Email and password are required");
    }
  };

  return (
    <div className="w-[100%] h-[100vh] bg-stone-400 px-2 py-2">
      <div className="w-full h-full overflow-hidden bg-gray-200 flex justify-between items-center rounded-xl gap-[2vw] py-[4vw] px-[4vw]">
        <div className="min-w-[50%] h-full">
          <img className="w-full h-full rounded-xl"  src="/public/images/register-page-abstract-element.jpg" alt="Kayzen" />
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

          <div className="w-full h-[40vh] ">
            <form className="w-full h-full flex flex-col justify-start items-center gap-[2vw]">
              <div className="flex items-center justify-center w-full">
                <div className="flex flex-col items-start">
                  <label className="capitalize text-gray-800 font-medium" htmlFor="email">
                    email
                  </label>
                  <div className="flex items-center relative">
                    <input
                      value={email}
                      onChange={(e) => dispatch(setEmail(e.target.value))}
                      type="email"
                      className="border-[1.5px] border-stone-400 rounded-lg w-[30vw] h-[5vh] pl-[1vw] pr-[1vw]"
                      placeholder="Enter Email"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center w-full">
                <div className="flex flex-col items-start">
                  <label
                    className="capitalize text-gray-800 font-medium"
                    htmlFor="password"
                  >
                    password
                  </label>
                  <div className="flex items-center relative">
                    <input
                      value={password}
                      onChange={(e) => dispatch(setPassword(e.target.value))}
                      type="password"
                      className="border-[1.5px] border-stone-400 rounded-lg w-[30vw] h-[5vh] pl-[1vw] pr-[1vw]"
                      placeholder="Enter Password"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={loginHandler}
                className="bg-violet-800 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-opacity-0.3"
              >
                Log in
              </button>

              <h6 className="capitalize font-semibold text-center">
                don't have an account?{" "}
                <Link to={"/register"} className="text-violet-800 cursor-pointer">
                  sign up
                </Link>
              </h6>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
