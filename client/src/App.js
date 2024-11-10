import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import AuthPage from "./Components/Auth/AuthPage"; // Import AuthPage
import Sidebar from "./Components/Sidebar/Sidebar";
import Dashboard from "./Components/Dashboard/Dashboard";
import Expenses from "./Components/Expenses/Expenses";
import Goals from "./Components/Goals/Goals";
import Investments from "./Components/Investments/Investments";
import SipCalculator from "./Components/sip/SipCalculator";
import SignOut from "./Components/SignOut/SignOut";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [loginState, setLoginState] = useState(false);  // Manage login state here
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      setLoginState(true);
    } else {
      setLoginState(false);
    }
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="h-screen flex w-full">
        {!loginState ? (
          <Routes>
            <Route path="/" element={<AuthPage setLoginState={setLoginState} />} />
            <Route path="/login" element={<AuthPage setLoginState={setLoginState} />} />
          </Routes>
        ) : (
          <>
            <Sidebar />
            <Routes>
            <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/goals" element={<Goals />} />
              <Route path="/investments" element={<Investments />} />
              <Route path="/sip" element={<SipCalculator />} />
              <Route path="/signout" element={<SignOut setLoginState={setLoginState} />} />
            </Routes>
          </>
        )}
      </div>
    </>
  );
}
