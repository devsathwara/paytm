import { Route, Routes } from "react-router-dom";
import { SignUp } from "./components/SignUp";
import { Login } from "./components/Login";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={{}} />
        </Routes>
      </div>
    </>
  );
}

export default App;
