import React from 'react'
import "./button.css"
const Button = ({ type, text, onClick}) => {
    return (
      <div onClick={onClick} className={type == "1" ? "button-1" : "button-2"}>
        {text}
      </div>
    );
};

export default Button