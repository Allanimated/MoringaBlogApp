import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Signin from "./Components/SignIn/SignIn";
import Signup from "./Components/SignUp/SignUp";
import Dashboard from "./Components/Dashboard/Dashboard";
import Create from "./Components/Create/Create";
import { useGlobalUserContext } from "./context/authContext";
import Profile from "./Components/UserProfile/Profile";
import PostPage from "./Components/Post/PostPage";
import UserAccountPage from "./Components/UserAccount/AccountPage";

function App() {
  // const [userToken, setUserToken] = useState("");
  // const [user, setUser] = useState(null);
  // function fetchUser(id) {
  //   if (id) {
  //     fetch(`/users/${id}`)
  //       .then((r) => r.json())
  //       .then((data) => {
  //         // save user data in state and local storage
  //         setUser(data);
  //         localStorage.setItem("user", JSON.stringify(data));
  //         //save user token on local storage
  //         localStorage.setItem("token", userToken);
  //       });
  //   }
  // }

  // useEffect(() => {
  //   fetch("/check_session")
  //     .then((resp) => resp.json())
  //     .then((data) => {
  //       //setuserToken(data.token);
  //       setUserToken(data.token);
  //       fetchUser(data.user_id);
  //     });
  // }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/signin" element={<Signin />} exact />
        <Route path="/signup" element={<Signup />} exact />
        <Route path="/dashboard" element={<Dashboard />} exact />
        <Route path="/create" element={<Create />} exact />
        <Route path="/profile" element={<Profile />} exact />
        <Route path="/posts/:id" element={<PostPage />} />
        <Route path="/account" element={<UserAccountPage />} />
      </Routes>
    </div>
  );
}

export default App;
