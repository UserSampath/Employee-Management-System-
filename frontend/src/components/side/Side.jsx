import React from "react";
import "./side.css";
import { FaRegUser } from "react-icons/fa";
import SidebarButton from "./SidebarButton";
const Side = ({ selected }) => {
  return (
    <div className="sidebarContainer">
      <div style={{ marginTop: "30px" }}>
        <SidebarButton
          buttonType={"All Employees"}
          selected={selected == "All Employees" ? true : false}
        />
        <SidebarButton
          buttonType={"Web Team"}
          selected={selected == "Web Team" ? true : false}
        />
        <SidebarButton
          buttonType={"Api Team"}
          selected={selected == "Api Team" ? true : false}
        />
        <SidebarButton
          buttonType={"Flutter Team"}
          selected={selected == "Flutter Team" ? true : false}
        />
        <SidebarButton
          buttonType={"UI/UX Team"}
          selected={selected == "UI Team" ? true : false}
        />
      </div>
    </div>
  );
};

export default Side;
