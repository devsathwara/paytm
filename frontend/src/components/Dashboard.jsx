import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { RenderUser } from "./Renderuser";
import { Spinner } from "@material-tailwind/react";
export function Dashboard() {
  const userId = Cookies.get("userId");
  const [balance, setBalance] = useState(null);
  const [users, setUsers] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
    if (searchValue !== "") {
      setIsLoading(true);
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/vi/user/bulk?filter=${searchValue}`
          );
          setUsers(response.data.user);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchData(); // Invoke the async function immediately
    }
  }, [searchValue]);

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
        {isLoading && (
          <div className="flex items-center justify-center mt-[130px]">
            <div
              className="flex justify-center inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          </div>
        )}{" "}
        {/* Display loader while loading */}
      </div>
      <div className="userdetails">
        {searchValue !== "" &&
          users
            .filter((user) => user._id !== userId)
            .map((user) => (
              <RenderUser
                key={user._id}
                toId={user._id}
                name={user.firstName + " " + user.lastName}
              />
            ))}
      </div>
    </>
  );
}
