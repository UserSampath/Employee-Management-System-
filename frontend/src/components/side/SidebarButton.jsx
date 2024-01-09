import React from "react";
import { FaRegUser } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
const SidebarButton = (props) => {
  return (
    <div
      style={{
        margin: "5px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <div>
        <div
          className={
            props.selected == true
              ? "selectedSidebarButton"
              : "notSelectedSidebarButton"
          }
          style={{
            margin: "0px",
            height: "40px",
            width: "220px",

            borderRadius: "4px",
            display: "flex",
            alignItems: "center",
          }}>
          <div
            style={{
              display: "flex",
              marginLeft: "25px",
            }}>
            <div style={{ marginRight: "10px", marginTop: "2px" }}>
              {props.buttonType == "User" && (
                <FaRegUser
                  className={
                    props.selected == true
                      ? "selectedSidebarIcon"
                      : "notSelectedSidebarIcon"
                  }
                
                  size={20}
                />
              )}
              {props.buttonType == "Analytics" && (
                <MdDashboard
                  className={
                    props.selected == true
                      ? "selectedSidebarIcon"
                      : "notSelectedSidebarIcon"
                  }
            
                  size={20}
                />
              )}
              {props.buttonType == "Settings" && (
                <IoSettingsSharp
                  className={
                    props.selected == true
                      ? "selectedSidebarIcon"
                      : "notSelectedSidebarIcon"
                  }
                  
                  size={20}
                />
              )}
            </div>

            <div
              style={{
                fontSize: "18px",
              }}>
              {props.buttonType}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarButton;
