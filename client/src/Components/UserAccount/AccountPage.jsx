import React from "react";
import Header from "../Header/Header";
import UserAccount from "./UserAccount";
import "./userAccountPage.css";

const UserAccountPage = () => {
  return (
    <div className="user-account-page">
      <Header />
      <UserAccount />
    </div>
  );
};

export default UserAccountPage;
