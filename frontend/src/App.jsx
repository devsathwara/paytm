import { Route, Routes } from "react-router-dom";
import { SignUp } from "./components/SignUp";
import { Login } from "./components/Login";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import { Dashboard } from "./components/Dashboard";
function App() {
  return (
    <>
      <AuthProvider>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/register" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </div>
      </AuthProvider>
    </>
  );
}

export default App;
