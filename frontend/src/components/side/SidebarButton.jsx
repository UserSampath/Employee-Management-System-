import React from "react";
import { FaRegUser } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { RiTeamLine } from "react-icons/ri";
import { FaReact } from "react-icons/fa";
import { AiOutlineApi } from "react-icons/ai";
import { TbBrandFlutter } from "react-icons/tb";
import { MdOutlineDesignServices } from "react-icons/md";
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
          onClick={()=>props.onClick()}
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
              {props.buttonType == "All Employees" && (
                <RiTeamLine
                  className={
                    props.selected == true
                      ? "selectedSidebarIcon"
                      : "notSelectedSidebarIcon"
                  }
                  size={20}
                />
              )}
              {props.buttonType == "Web Team" && (
                <FaReact
                  className={
                    props.selected == true
                      ? "selectedSidebarIcon"
                      : "notSelectedSidebarIcon"
                  }
                  size={20}
                />
              )}
              {props.buttonType == "Api Team" && (
                <AiOutlineApi
                  className={
                    props.selected == true
                      ? "selectedSidebarIcon"
                      : "notSelectedSidebarIcon"
                  }
                  size={20}
                />
              )}
              {props.buttonType == "Flutter Team" && (
                <TbBrandFlutter
                  className={
                    props.selected == true
                      ? "selectedSidebarIcon"
                      : "notSelectedSidebarIcon"
                  }
                  size={20}
                />
              )}
              {props.buttonType == "UI/UX Team" && (
                <MdOutlineDesignServices
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
