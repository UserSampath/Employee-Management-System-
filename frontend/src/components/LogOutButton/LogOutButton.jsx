import React from "react";
import Button from "../Button/Button";

const LogOutButton = (props) => {

  
  return (
    <div>
      <div
        style={{
          backgroundColor: "#d3d3d3",
          width: "170px",
          height: "60px",
          position: "absolute",
          right: "60px",
          top: "50px",
          borderRadius: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Button
          type={"button-black"}
          text="Log Out"
          onClick={()=>props.onClick()}
       
        />
      </div>
    </div>
  );
};

export default LogOutButton;
