import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import PostListing from "./PostListing";
import "./dashboard.css"
import Panel from "./Panel";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Header />
      <div className="left-center-right">
        <Sidebar />
        <PostListing />
        <Panel />
      </div>
    </div>
  );
};

export default Dashboard;