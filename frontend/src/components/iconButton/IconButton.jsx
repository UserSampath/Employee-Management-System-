import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import "./iconButton.css"
const IconButton = (props) => {
    return (
      <div className="ss">
        <div
          className={
            props.buttonColor == "red"
              ? " d-flex justify-content-center align-items-center iconButtonContainerRed"
              : " d-flex justify-content-center align-items-center iconButtonContainerGreen"
          }
          style={{
            padding: "3px 8px 3px 8px",
            borderRadius: "5px",
            margin: "0 5px 0 5px",
          }}>
          {props.text == "Delete" ? (
            <MdDeleteOutline
              size={22}
              className={
                props.buttonColor == "red"
                  ? "iconButtonTextRed"
                  : "iconButtonTextGreen"
              }
            />
          ) : (
            <MdEdit
              size={22}
              className={
                props.buttonColor == "red"
                  ? "iconButtonTextRed"
                  : "iconButtonTextGreen"
              }
            />
          )}
          <div
            className={
              props.buttonColor == "red"
                ? "iconButtonTextRed"
                : "iconButtonTextGreen"
            }
            style={{ fontSize: "16px" }}>
            {props.text}
          </div>
        </div>
      </div>
    );
};

export default IconButton;
