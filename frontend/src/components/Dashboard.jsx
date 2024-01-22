import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Dashboard() {
  const { isLoggedIn } = useAuth();
  const navigateTo = useNavigate();
  console.log("isLoggedIn:", isLoggedIn);
  useEffect(() => {
    console.log("Dashboard component mounted");
    console.log("IsLoggedIn:", isLoggedIn);

    // Check if the user is not logged in, then redirect them to the login page
    if (!isLoggedIn) {
      console.log("Redirecting to login");
      navigateTo("/login");
    }
  }, [isLoggedIn, navigateTo]);

  return (
    <>
      <div className="balance flex flex-row mt-[40px] p-[20px]">
        <h3 className="font-bold text-[35px]">Your Balance : </h3>
        <p className="font-semibold text-[35px] pl-[20px]">5000₹</p>
      </div>
      <div className="users flex flex-col mt-[40px] p-[20px]">
        <h3 className="font-bold text-[35px]">Users</h3>
        <input
          type="text"
          name="search"
          className="max-w-screen-3xl mt-[10px] h-auto border p-[10px] border-gray-400 rounded-[5px]"
          placeholder="Search User"
        />
      </div>
      <div className="userdetails">
        <RenderUser name="Dev" />
      </div>
    </>
  );

  // Render the Dashboard content
}
// eslint-disable-next-line react/prop-types
function RenderUser({ name }) {
  return (
    <>
      <div className="flex flex-row justify-between m-[50px]">
        <p className="font-bold text-[25px]">{name}</p>
        <button className="bg-black text-white p-[10px] rounded-md">
          Send Money
        </button>
      </div>
    </>
  );
}
