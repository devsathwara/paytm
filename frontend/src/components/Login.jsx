import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
export function Login() {
  const { login, isLoggedIn } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigateTo = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/vi/user/login",
        formData
      );
      login();
      console.log(response);
      console.log("isLoggedIn:", isLoggedIn);
      if (!response.data.success) throw new Error("Server error");
      alert("Login Successfully");
      navigateTo("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex flex-col h-screen font-poppins items-center bg-slate-700">
        <div className="card rounded-[10px] m-auto h-[480px] w-[400px] max-w-sm overflow-hidden shadow-lg relative bg-white">
          <h1 className="text-3xl text-black font-bold mt-6 text-center ">
            Sign In
          </h1>
          <p className="text-slate-400 text-center mt-4">
            Enter your credentials to access your account
          </p>
          <div className="form flex mt-[10px] justify-center">
            <form
              className="flex m-auto flex-col p-8 text-center"
              onSubmit={handleSubmit}
            >
              <div className="mb-9 flex flex-col">
                <label className="font-bold mb-2">Email:</label>
                <input
                  type="email"
                  name="email"
                  className="border border-gray-300 p-2 w-[350px] rounded-[10px]"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-9 flex flex-col">
                <label className="font-bold mb-2">Password:</label>
                <input
                  type="password"
                  name="password"
                  className="border border-gray-300 p-2 w-[350px] rounded-[10px]"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="submit"
                className="w-[350px] h-[40px]  bg-black text-white rounded-md m-auto"
              >
                Login
              </button>
              <div className="flex flex-row justify-center m-5">
                <p className="text-black font-semibold">
                  Don't have an account?
                </p>
                <a
                  href="/register"
                  className="pl-1 underline text-black font-semibold"
                >
                  Register
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
