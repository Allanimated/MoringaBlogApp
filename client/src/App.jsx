import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Signin from "./Components/SignIn/SignIn";
import Signup from "./Components/SignUp/SignUp";
import Dashboard from "./Components/Dashboard/Dashboard";
import Create from "./Components/Create/Create";
import { useGlobalUserContext } from "./context/authContext";
import Profile from "./Components/UserProfile/Profile";

function App() {
  const { setToken } = useGlobalUserContext();

  useEffect(() => {
    fetch("/check_session")
      .then((resp) => resp.json())
      .then((data) => setToken(data.token));
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/signin" element={<Signin />} exact />
        <Route path="/signup" element={<Signup />} exact />
        <Route path="/dashboard" element={<Dashboard />} exact />
        <Route path="/create" element={<Create />} exact />
        <Route path="/profile" element={<Profile />} exact />
      </Routes>
    </div>
  );
}

export default App;
