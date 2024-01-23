import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

export function Dashboard() {
  const userId = Cookies.get("userId");
  const [balance, setBalance] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const navigateTo = useNavigate();
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const token = Cookies.get("token");

        if (!token) {
          // Token is not available, navigate to login
          navigateTo("/login", { replace: true });
          return;
        }

        const response = await axios.get(
          "http://localhost:8080/api/vi/account/balance",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        // Assuming the balance is returned in the response
        setBalance(response.data.balance);
      } catch (error) {
        // Handle errors
        console.error("Error fetching balance:", error);
        // You may want to navigate to the login page or show an error message
      }
    };

    if (!userId) {
      navigateTo("/login", { replace: true });
    } else {
      fetchBalance();
    }
  }, [userId, navigateTo]);
  useEffect(() => {
    try {
      const fetchUser = async () => {
        const response = await axios.get(
          `http://localhost:8080/api/vi/user/bulk?filter=${searchValue}`
        );
        console.log(response);
      };
      fetchUser();
    } catch (error) {
      // Handle errors
      console.error("Error fetching user data:", error);
      // You may want to navigate to the login page or show an error message
    }
  }, [searchValue, navigateTo]);
  return (
    <>
      <div className="balance flex flex-row mt-[40px] p-[20px]">
        <h3 className="font-bold text-[35px]">Your Balance : </h3>
        <p className="font-semibold text-[35px] pl-[20px]">{balance}</p>
      </div>
      <div className="users flex flex-col mt-[40px] p-[20px]">
        <h3 className="font-bold text-[35px]">Users</h3>
        <input
          type="text"
          name="search"
          onChange={(e) => setSearchValue(e.target.value)}
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
