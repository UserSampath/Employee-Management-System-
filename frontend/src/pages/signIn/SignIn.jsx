import React, { useState } from "react";
import "./SignIn.css";
import TextInput from "../../components/TextInput/TextInput";
import Button from "../../components/Button/Button";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //errors
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");


const signInButtonClicked = async() => {
  if (!email) {
    setEmailError("Enter email");
  } else if (!validator.isEmail(email)) {
    setEmailError("Enter valid email");
  } else if (!password) {
    setPasswordError("Enter password");
  } else if (!validator.isLength(password, { min: 8 })) {
    setPasswordError("Password must be at least 8 characters long");
  }else {
      await axios
        .post("http://localhost:4000/api/user/login", {
          email,
          password,
        })
        .then((res) => {
          if (res.status == 200) {
            localStorage.setItem("token", JSON.stringify(res.data.token));
            localStorage.setItem(
              "userName",
              JSON.stringify(`${res.data.user.firstName} ${res.data.user.lastName}`)
            );

            Swal.fire({
              icon: "success",
              title: "login success",
              showConfirmButton: false,
              timer: 1500,
            });
            console.log(res.data)
          }
          setTimeout(() => {
            navigate("/");
          }, 1500);
        })
        .catch((err) => {
          if (err.response.data.error) {
             Swal.fire({
              title: "Sign Up failed",
              text: err.response.data.error,
              icon: "question",
            });
          }
        });
    }


};

  return (
    <div className="signUpPage">
      <div className="boxContainer">
        <div className="signInBox">
          <div className="centerSignIn">
            <div className="signInContainer">
              <h2>Sign In</h2>
              <TextInput
                type={"text"}
                icon={"mail"}
                inputName={"Email"}
                placeholder={"Enter Email"}
                value={email}
                onChange={(value) => setEmail(value)}
                errorMessage={emailError}
                onFocus={() => setEmailError("")}
              />
              <TextInput
                type={"password"}
                icon={"lock"}
                inputName={"Password"}
                placeholder={"Enter Password"}
                value={password}
                onChange={(value) => setPassword(value)}
                errorMessage={passwordError}
                onFocus={() => setPasswordError("")}
              />

              <div className="buttonsContainer">
                <Button
                  onClick={signInButtonClicked}
                  type={"1"}
                  text="Sign In"
                />
              </div>
              <div className="newHereContainer">
                <div>
                  <h2>New Here?</h2>
                  <div className="newHereButton">
                    <Button
                      onClick={() => navigate("/register")}
                      type={"2"}
                      text="Sign Up"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="imageContainer">
          <div className="imageBox">
            <div>
              <div className="imgContainerText">
                <h2 className="whiteH2">Welcome to</h2>
                <h1>Employee Management System</h1>
                <p>Log in to access your account. </p>
              </div>
              <img className="signInImage" src="../../image/pic1.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
