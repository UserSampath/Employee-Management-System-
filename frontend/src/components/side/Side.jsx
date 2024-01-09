import React from "react";
import "./side.css";
import { FaRegUser } from "react-icons/fa";
import SidebarButton from "./SidebarButton";
import { useNavigate } from "react-router-dom";
const Side = ({ selected }) => {
  const navigation = useNavigate();
  return (
    <div className="sidebarContainer">
      <div style={{ marginTop: "30px" }}>
        <SidebarButton
          buttonType={"All Employees"}
          selected={selected == "All Employees" ? true : false}
          onClick={() => navigation("/")}
        />
        <SidebarButton
          buttonType={"Web Team"}
          selected={selected == "Web Team" ? true : false}
          onClick={() => navigation("/web_team")}
        />
        <SidebarButton
          buttonType={"Api Team"}
          selected={selected == "Api Team" ? true : false}
          onClick={() => navigation("/api_team")}
        />
        <SidebarButton
          buttonType={"Flutter Team"}
          selected={selected == "Flutter Team" ? true : false}
          onClick={() => navigation("/flutter_team")}
        />
        <SidebarButton
          buttonType={"UI/UX Team"}
          selected={selected == "UI/UX Team" ? true : false}
          onClick={() => navigation("/ui_ux_team")}
        />
      </div>
    </div>
  );
};

export default Side;
