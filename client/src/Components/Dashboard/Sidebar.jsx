import React from "react";
import "./sidebar.css";
import SchoolIcon from "@mui/icons-material/School";
import { useGlobalContext } from "../../context/postsContext";

const Sidebar = () => {
  // Destructuring the filterPostByPhase
  const { filterPostByPhase } = useGlobalContext();

  return (
    <div className="sidebar">
      <ul className="phases">
        <li
          onClick={() => {
            filterPostByPhase('All');
          }}
        >
          <SchoolIcon />
          View all
        </li>
        <li
          onClick={() => {
            filterPostByPhase(0);
          }}
        >
          <SchoolIcon />
          Phase 0
        </li>
        <li
          onClick={() => {
            filterPostByPhase(1);
          }}
        >
          {" "}
          <SchoolIcon />
          Phase 1
        </li>
        <li
          onClick={() => {
            filterPostByPhase(2);
          }}
        >
          {" "}
          <SchoolIcon />
          Phase 2
        </li>
        <li
          onClick={() => {
            filterPostByPhase(3);
          }}
        >
          {" "}
          <SchoolIcon />
          Phase 3
        </li>
        <li
          onClick={() => {
            filterPostByPhase(4);
          }}
        >
          {" "}
          <SchoolIcon />
          Phase 4
        </li>
        <li
          onClick={() => {
            filterPostByPhase(5);
          }}
        >
          {" "}
          <SchoolIcon />
          Phase 5
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
