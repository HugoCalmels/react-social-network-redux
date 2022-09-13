import React, { useState, useEffect } from "react";
import {
  login,
  getUserErrorStatus,
  getUserStatusAfterFailedLogin,
} from "../../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import "../../Styles/Authentication/Login.scss";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Register from "./Register";
const Login = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const error = useSelector(getUserErrorStatus);
  const userStatusAfterFailedLogin = useSelector(getUserStatusAfterFailedLogin);

  useEffect(() => {
    let hoover = document.querySelector(".auth-hoover");
    hoover.addEventListener("click", () => {
      let btnInputPasswordElem = document.querySelector(
        ".auth-input-btn-elem-password"
      );
      let btnInputEmailElem = document.querySelector(
        ".auth-input-btn-elem-email"
      );
      btnInputPasswordElem.style.border = "none";
      btnInputPasswordElem.style.boxShadow = "none";
      btnInputPasswordElem.classList.remove("active");
      btnInputEmailElem.style.border = "none";
      btnInputEmailElem.style.boxShadow = "none";
      btnInputEmailElem.classList.remove("active");
    });
  }, []);

  useEffect(() => {}, [userStatusAfterFailedLogin, dispatch]);

  const tryToLogin = () => {
    try {
      setAddRequestStatus("pending");
      dispatch(login({ email, password })).unwrap();
      Cookies.set("email", email);
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error("Failed to save the person", err);
    } finally {
      setAddRequestStatus("idle");
    }
  };

  const colorChange1 = (e) => {
    let hoover = document.querySelector(".auth-hoover");
    let btnInputPasswordElem = document.querySelector(
      ".auth-input-btn-elem-password"
    );
    e.target.style.border = "1px solid #1877f2";
    e.target.style.boxShadow = "0 0 0 2px #e7f3ff";
    e.target.style.caretColor = "#1877f2";
    e.target.classList.add("active");
    hoover.classList.add("active");
    btnInputPasswordElem.style.border = "none";
    btnInputPasswordElem.style.boxShadow = "none";
    btnInputPasswordElem.classList.remove("active");
  };
  const colorChange2 = (e) => {
    let hoover = document.querySelector(".auth-hoover");
    let btnInputEmailElem = document.querySelector(
      ".auth-input-btn-elem-email"
    );
    e.target.style.border = "1px solid #1877f2";
    e.target.style.boxShadow = "0 0 0 2px #e7f3ff";
    e.target.style.caretColor = "#1877f2";
    e.target.classList.add("active");
    hoover.classList.add("active");
    btnInputEmailElem.style.border = "none";
    btnInputEmailElem.style.boxShadow = "none";
    btnInputEmailElem.classList.remove("active");
  };

  const navigateToForgottenPassword = () => {
    navigate("/forgotten-password");
  };

  const openCreateAccount = (e) => {
    let registerDiv = document.querySelector(".register-main-container");
    let registerHoover = document.querySelector(".register-hoover");
    e.preventDefault();

    registerDiv.style.display = "flex";
    registerHoover.style.display = "block";
    setCurrentPage("register");
  };
  return (
    <>
      <div className="auth-form-container-2">
        <Register currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <div className="auth-form-container-3">
          <form>
            <div className="input-entry">
              <input
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Adresse e-mail ou numéro de tel."
                onClick={colorChange1}
                className="auth-input-btn-elem-email"
              ></input>
            </div>

            <div className="input-entry">
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
                onClick={colorChange2}
                className="auth-input-btn-elem-password"
              ></input>
            </div>

            <button
              className="send-login-btn"
              type="button"
              onClick={tryToLogin}
            >
              Se connecter
            </button>
            <div className="forgotten-password-btn-container">
              <a onClick={navigateToForgottenPassword}>Mot de passe oublié ?</a>
            </div>
            <div className="auth-custom-hr"></div>
            <div className="send-register-btn-container">
              <button
                className="send-register-btn"
                onClick={(e) => openCreateAccount(e)}
              >
                Créer nouveau compte
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="auth-login-hidden-div"></div>
    </>
  );
};

export default Login;
