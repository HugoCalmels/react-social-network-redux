import React, { useEffect, useState } from "react";
import { login } from "../../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import "../../Styles/Authentication/Login.scss";
import { getUserErrorStatus, getAuthNextAction } from "../../redux/features/auth/authSlice";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
const Login2 = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");


  const nextAction = useSelector(getAuthNextAction)

  


  const tryToLogin = () => {
    console.log('hey?')
 
      try {
        setAddRequestStatus("pending");
        dispatch(login({ email, password })).unwrap();
        Cookies.set('email', email)
        setEmail("");
        setPassword("");
      } catch (err) {
        console.error("Failed to save the person", err);
      } finally {
        setAddRequestStatus("idle");
      }
   
  };


  console.log('22222222222222222222222222222222222222')
  console.log('22222222222222222222222222222222222222')
  console.log('22222222222222222222222222222222222222')
  console.log('22222222222222222222222222222222222222')
  console.log(email)
  console.log('22222222222222222222222222222222222222')
  console.log('22222222222222222222222222222222222222')
  console.log('22222222222222222222222222222222222222')
  console.log('22222222222222222222222222222222222222')



  const colorChange1 = (e) => {
    let btnInputPasswordElem = document.querySelector('.auth-input-btn-elem-password')
    console.log( btnInputPasswordElem)
    e.target.style.border = "1px solid #1877f2";
    e.target.style.boxShadow = "0 0 0 2px #e7f3ff";
    e.target.style.caretColor = "#1877f2";
    e.target.classList.add('active')
    btnInputPasswordElem.style.border = "none";
    btnInputPasswordElem.style.boxShadow = "none";
    btnInputPasswordElem.classList.remove('active')
    
  }
  const colorChange2 = (e) => {
    let btnInputEmailElem = document.querySelector('.auth-input-btn-elem-email')
    e.target.style.border = "1px solid #1877f2";
    e.target.style.boxShadow = "0 0 0 2px #e7f3ff";
    e.target.style.caretColor = "#1877f2";
    e.target.classList.add('active')
    btnInputEmailElem.style.border = "none";
    btnInputEmailElem.style.boxShadow = "none";
    btnInputEmailElem.classList.remove('active')
  }
  return (
    <>
      <div className="auth-form-container-2">
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

            <button className="send-login-btn" type="button" onClick={tryToLogin}>
              Se connecter
            </button>
            <div className="forgotten-password-btn-container">
              <a>Mot de passe oublié ?</a>
            </div>
            <div className="auth-custom-hr"></div>
            <div className="send-register-btn-container">
            <button className="send-register-btn">
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

export default Login2;
