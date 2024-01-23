/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
export function RenderUser({ name, toId }) {
  const navigateTo = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const userId = Cookies.get("userId");
  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };
  const transferBalance = async () => {
    try {
      const token = Cookies.get("token");

      if (!token) {
        // Token is not available, navigate to login
        navigateTo("/login", { replace: true });
        return;
      }
      console.log(userId);
      const response = await axios.post(
        "http://localhost:8080/api/vi/account/transfer",
        {
          to: toId.toString(),
          amount: parseInt(transferAmount),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status == 200) {
        alert("Payment Successfull");
        window.location.reload();
      }
      console.log(response);
    } catch (error) {
      // Handle errors
      console.error("Error transferring balance:", error);
      // You may want to navigate to the login page or show an error message
    }
  };

  const handleTransfer = () => {
    // Add validation logic
    // if (!recipientEmail || !transferAmount || isNaN(parseInt(transferAmount))) {
    //   // Handle validation error, e.g., show an error message
    //   console.error("Invalid input. Please check recipient and amount.");
    //   return;
    // }

    // Initiate the balance transfer
    transferBalance();

    // Reset form fields and close modal
    setRecipientEmail("");
    setTransferAmount("");
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="flex flex-row justify-between m-[50px]">
        <p className="font-bold text-[25px]">{name}</p>
        <button
          onClick={handleModalToggle}
          className="bg-black text-white p-[10px] rounded-md"
        >
          Send Money
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-30 flex justify-center items-center">
          <div className="relative p-4 w-full max-w-md max-h-full">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 border-b rounded-t">
                <h3 className="text-xl font-semibold text-gray-900">
                  Transfer Money
                </h3>
                <button
                  onClick={handleModalToggle}
                  className="text-gray-400 hover:text-gray-900 rounded-lg"
                >
                  {/* Close modal button */}
                  &times;
                </button>
              </div>
              {/* Modal body */}
              <div className="p-4">
                <form>
                  <div className="mb-4">
                    <label
                      htmlFor="recipientEmail"
                      className="block text-sm font-medium text-gray-900"
                    >
                      Recipient's Name
                    </label>
                    <input
                      type="text"
                      id="recipientEmail"
                      name="recipientEmail"
                      value={name}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      className="mt-1 p-2 border rounded-md w-full"
                      required
                      readOnly
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="transferAmount"
                      className="block text-sm font-medium text-gray-900"
                    >
                      Transfer Amount
                    </label>
                    <input
                      type="number"
                      id="transferAmount"
                      name="transferAmount"
                      value={transferAmount}
                      onChange={(e) => setTransferAmount(e.target.value)}
                      className="mt-1 p-2 border rounded-md w-full"
                      required
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleTransfer}
                      className="bg-blue-700 text-white p-2 rounded-md"
                    >
                      Transfer
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
