import React, { useEffect, useState } from "react";
import "./SignUp.css";
import TextInput from "../../components/TextInput/TextInput";
import Button from "../../components/Button/Button";
import Swal from "sweetalert2";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //errors
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");


  const signUpButtonClicked = async () => {
    if (!firstName) {
      setFirstNameError("Enter first name");
    } else if (!lastName) {
      setLastNameError("Enter last name");
    } else if (!email) {
      setEmailError("Enter email");
    } else if (!validator.isEmail(email)) {
      setEmailError("Enter valid email");
    } else if (!password) {
      setPasswordError("Enter password");
    } else if (!validator.isLength(password, { min: 8 })) {
      setPasswordError("Password must be at least 8 characters long");
    } else {
      await axios
        .post("http://localhost:4000/api/user/signup", {
          firstName,
          lastName,
          email,
          password,
        })
        .then((res) => {
          if (res.status == 200) {
            
            localStorage.setItem("token", JSON.stringify(res.data.token));
            localStorage.setItem(
              "userName",
              JSON.stringify(
                `${res.data.user.firstName} ${res.data.user.lastName}`
              )
            );
            Swal.fire({
              icon: "success",
              title: "successfully registered",
              showConfirmButton: false,
              timer: 1500,
            });
          }
          setTimeout(() => {
            navigate("/admin");
          }, 1500);
        })
        .catch((err) => {
          if (err.response.data.error) {
            console.log();
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
            <div className="signContainer2">
              <h2>Sign Up</h2>
              <TextInput
                type={"text"}
                icon={"profile"}
                inputName={"First Name"}
                placeholder={"Enter First Name"}
                value={firstName}
                onChange={(value) => setFirstName(value)}
                errorMessage={firstNameError}
                onFocus={() => setFirstNameError("")}
              />
              <TextInput
                type={"text"}
                icon={"profile"}
                inputName={"Last Name"}
                placeholder={"Enter Last Name"}
                value={lastName}
                onChange={(value) => setLastName(value)}
                errorMessage={lastNameError}
                onFocus={() => setLastNameError("")}
              />
              <TextInput
                type={"email"}
                icon={"mail"}
                inputName={"email"}
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
                  type={"1"}
                  text="Sign Up"
                  onClick={signUpButtonClicked}
                />
              </div>
              <div className="newHereContainer">
                <div>
                  <h2>Already have an account?</h2>
                  <div className="newHereButton2">
                    <Button
                      onClick={() => navigate("/login")}
                      type={"2"}
                      text="Sign In"
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
                <h1>Lenzz Rating System</h1>
                <p>Register to create your account </p>
              </div>
              <img className="signInImage" src="../../image/pic1.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
