
import React, { useEffect, useState } from "react";
import { login } from "../../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { getUserErrorStatus, getUserByEmail , selectUserByEmail, getUserStatus, getUserStatusAfterFailedLogin} from "../../redux/features/auth/authSlice";
import iconAlert2 from "../../assets/icons/iconAlert2.png"
import defaultProfile from "../../assets/images/defaultProfile.jpg";
const LoginFail = () => {

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const error = useSelector(getUserErrorStatus)
  const userByEmail = useSelector(selectUserByEmail)
  const userStatus = useSelector(getUserStatus)
  const userStatusAfterFailedLogin = useSelector(getUserStatusAfterFailedLogin)
  const canSave =
    [email, password].every(Boolean) && addRequestStatus === "idle";

  const tryToLogin = () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(login({ email, password })).unwrap();
        setEmail("");
        setPassword("");
      } catch (err) {
        console.error("Failed to save the person", err);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  }



  useEffect(() => {
    console.log('TRIGGERED USE EFFECT')
    console.log(userByEmail)
  }, [userStatusAfterFailedLogin, dispatch])


  console.log('%%%%%%%%%%%%%%')
  console.log(userByEmail)
  console.log('%%%%%%%%%%%%%%')

  useEffect(() => {
    if (error === "wrong password") {
      dispatch(getUserByEmail())
    }
  },[])



  console.log('????????????????')
  console.log('????????????????')
  console.log('????????????????')
  console.log(userByEmail)
  console.log('????????????????')
  console.log('????????????????')


  const colorChange1 = (e) => {

    
  }
  const colorChange2 = (e) => {

  }
  return (
    <>
    <div className="failed-auth-form-container-2">
        <div className="failed-auth-form-container-3">
          {error === "wrong account" ?
            <div className="failed-auth-form-small-header">Se connecter à Clonebook</div>
            : error === "wrong password" ?
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
                  <span>
                    Se connecter en tant que {userByEmail.username}
                  </span>
                </div>
        
              </div>
              : 
            ''
            }
          
          <form>
          
            {error === "wrong account" ?
              <div className="failed-input-entry alert">
       
              <input
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Adresse e-mail ou numéro de tel."
                onClick={colorChange1}
                className="failed-auth-input-btn-elem-email alert"
                ></input>
               
                <img className="alert-icon" src={iconAlert2}></img>
             
            </div>
              :
              <div className="failed-input-entry">
       
            <input
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Adresse e-mail ou numéro de tel."
              onClick={colorChange1}
              className="failed-auth-input-btn-elem-email"
            ></input>
          </div>
            }

            {error === "wrong account" ?
              <div className="login-error-messages">
                L'addresse email que vous avez saisie n'est pas associée à une compte. <b> Trouvez votre compte et connectez vous.</b>
              </div>
              : ''}
          
            {error === "wrong password" ?
             <div className="failed-input-entry alert">
      
             <input
               type="password"
               onChange={(e) => setPassword(e.target.value)}
               placeholder="Mot de passe"
               onClick={colorChange2}
               className="failed-auth-input-btn-elem-password alert"
                ></input>
                
                <img className="alert-icon" src={iconAlert2}></img>
               
                
           </div>
              :
              <div className="failed-input-entry">
      
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
              onClick={colorChange2}
              className="failed-auth-input-btn-elem-password"
            ></input>
              </div>
              
            }

              {error === "wrong password" ?
              <div className="login-error-messages">
                Le mot de passe rentré est incorrect. <b>Vous l'avez oublié ?</b>
              </div>
              : ''}
          
          <button className="failed-send-login-btn" type="button" onClick={tryToLogin}>
            Se connecter
          </button>
          <div className="failed-forgotten-password-btn-container">
            <a>Mot de passe oublié ?</a>
          </div>
          
         
        </form>
       
      </div>
    </div>
  </>
  )
}


export default LoginFail