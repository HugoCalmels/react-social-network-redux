import React, { useEffect, useState } from "react";
import { login } from "../../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserErrorStatus,
  getUserByEmail,
  selectUserByEmail,
  getUserStatus,
  getUserStatusAfterFailedLogin,
} from "../../redux/features/auth/authSlice";
import iconAlert2 from "../../assets/icons/iconAlert2.png";
import defaultProfile from "../../assets/images/defaultProfile.jpg";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const LoginFail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const error = useSelector(getUserErrorStatus);
  const userByEmail = useSelector(selectUserByEmail);
  const userStatus = useSelector(getUserStatus);
  const userStatusAfterFailedLogin = useSelector(getUserStatusAfterFailedLogin);
  const canSave =
    [email, password].every(Boolean) && addRequestStatus === "idle";

  const hoover = document.querySelector(".auth-hoover");
  const passwordInputElem = document.querySelector("#pw-failed-login");
  const loader = document.querySelector(".loader-failed-connexion")

  const tryToLogin = () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(login({ email, password })).unwrap();
        setEmail("");
        setPassword("");
        passwordInputElem.value = "";
        //loader.style.display = "flex"
        Cookies.set("email", email);
      } catch (err) {
        console.error("Failed to save the person", err);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  useEffect(() => {}, [userStatusAfterFailedLogin, dispatch]);

  useEffect(() => {
    if (error === "wrong password") {
      dispatch(getUserByEmail());
    }
  }, []);
  useEffect(() => {
    dispatch(getUserByEmail());
  }, [userStatus]);

  useEffect(() => {
    if (userByEmail !== "") {
      setEmail(userByEmail.email);
    }
  }, [userByEmail]);

  if (hoover !== null) {
    hoover.addEventListener("click", () => {
      let inputEmail = document.querySelector(
        ".failed-auth-input-btn-elem-email"
      );
      let inputPw = document.querySelector(
        ".failed-auth-input-btn-elem-password"
      );
      inputEmail.classList.remove("active");
      inputPw.classList.remove("active");
    });
  }

  const colorChange1 = (e) => {
    let otherInput = document.querySelector(
      ".failed-auth-input-btn-elem-password"
    );
    e.target.classList.add("active");
    otherInput.classList.remove("active");
    hoover.classList.add("active");
  };
  const colorChange2 = (e) => {
    let otherInput = document.querySelector(
      ".failed-auth-input-btn-elem-email"
    );
    e.target.classList.add("active");
    otherInput.classList.remove("active");
    hoover.classList.add("active");
  };

  const navigateToForgottenPassword = () => {
    navigate("/forgotten-password");
  };

  console.log("LOGIN FAIL")
  console.log('//////////////////////')
  console.log(error)
  console.log(userByEmail)
  console.log('//////////////////////')
  console.log("LOGIN FAIL")


  return (
    <>
      <div className="failed-auth-form-container-2">
        <div className="failed-auth-form-container-3">
          {error === "wrong account" ? (
            <div className="failed-auth-form-small-header">
              Se connecter à Clonebook
            </div>
          ) : error === "wrong password" ? (
            <div className="failed-auth-form-failed-password-container">
              <div className="failed-auth-failed-password-image-container">
                {userByEmail.avatar_link !== null ? (
                  <>
                    <img src={userByEmail.avatar_link} alt="avatarImage"></img>
                  </>
                ) : (
                  <>
                    <img src={defaultProfile} alt="avatarImage"></img>
                  </>
                )}
              </div>
              <div className="failed-auth-failed-password-connection">
                <span>Se connecter en tant que {userByEmail.username}</span>
              </div>
            </div>
          ) : (
            ""
          )}

          <form>
            {error === "wrong account" ? (
              <div className="failed-input-entry alert">
                <input
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Adresse e-mail ou numéro de tel."
                  onClick={(e) => colorChange1(e)}
                  className="failed-auth-input-btn-elem-email alert"
                ></input>

                <img
                  className="alert-icon"
                  src={iconAlert2}
                  alert="infos"
                ></img>
              </div>
            ) : (
              <div className="failed-input-entry">
                <input
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={userByEmail.email}
                  onClick={(e) => colorChange2(e)}
                  className="failed-auth-input-btn-elem-email"
                ></input>
              </div>
            )}

            {error === "wrong account" ? (
              <div className="login-error-messages">
                L'addresse email que vous avez saisie n'est pas associée à une
                compte.{" "}
                <span onClick={navigateToForgottenPassword}>
            
                  Trouvez votre compte et connectez vous.
                </span>
              </div>
            ) : (
              ""
            )}

            {error === "wrong password" ? (
              <div className="failed-input-entry alert">
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mot de passe"
                  onClick={colorChange2}
                  className="failed-auth-input-btn-elem-password alert"
                  id="pw-failed-login"
                ></input>

                <img className="alert-icon" src={iconAlert2} alt="infos"></img>
              </div>
            ) : (
              <div className="failed-input-entry">
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mot de passe"
                  onClick={colorChange2}
                  className="failed-auth-input-btn-elem-password"
                  id="pw-failed-login"
                ></input>
              </div>
            )}

            {error === "wrong password" ? (
              <div className="login-error-messages">
                Le mot de passe rentré est incorrect.{" "}
                <span id="failed-connexion-forgotten-pw-link" onClick={navigateToForgottenPassword}>Vous l'avez oublié ?</span>
              </div>
            ) : (
              ""
            )}

            <button
              className="failed-send-login-btn"
              type="button"
              onClick={tryToLogin}
            >
              Se connecter
            </button>
            <div className="failed-forgotten-password-btn-container">
              <a onClick={navigateToForgottenPassword}>Mot de passe oublié ?</a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginFail;
