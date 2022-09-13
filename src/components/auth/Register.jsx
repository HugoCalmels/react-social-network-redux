import { useState, useEffect } from "react";
import crossIcon from "../../assets/icons/closeIcon3.png";
import errorRed from "../../assets/icons/errorRed.png";
import { useDispatch } from "react-redux";
import { register } from "../../redux/features/auth/authSlice";
const Register = (props) => {
  const dispatch = useDispatch();
  const [currentInput, setCurrentInput] = useState("username");
  let regex = /(?!.*\.\.)(^[^\.][^@\s]+@[^@\s]+\.[^@\s\.]+$)/;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [emailValidation, setEmailValidation] = useState("");
  const [password, setPassword] = useState("");
  const [openedError, setOpenedError] = useState("");
  let lastClick = "";
  const firstInput = document.querySelector("#register-input-username");
  const errorMessagesElements = document.querySelectorAll(
    ".register-input-error"
  );
  const errorMessageElemUsername = document.querySelector(
    ".register-input-error.username"
  );
  const errorMessageElemEmail = document.querySelector(
    ".register-input-error.email"
  );
  const errorMessageElemEmailValidation = document.querySelector(
    ".register-input-error.emailValidation"
  );
  const errorMessageElemPassword = document.querySelector(
    ".register-input-error.password"
  );

  const inputElements = document.querySelectorAll(".register-input");
  const inputUsernameElem = document.querySelector(".register-input.username");
  const inputEmailElem = document.querySelector(".register-input.email");
  const inputEmailValidationElem = document.querySelector(
    ".register-input.emailValidation"
  );
  const inputPasswordElem = document.querySelector(".register-input.password");

  const errorBtnElements = document.querySelectorAll(".error-red");
  const errorBtnUsername = document.querySelector(".error-red.username");
  const errorBtnEmail = document.querySelector(".error-red.email");
  const errorBtnEmailValidation = document.querySelector(
    ".error-red.emailValidation"
  );
  const errorBtnPassword = document.querySelector(".error-red.password");
  const [focus, setFocus] = useState(true);
  const hiddenEmailValidationInput = document.querySelector(
    ".register-input-container.emailValidation"
  );

  const [lastError, setLastError] = useState("");
  const formElem = document.querySelector("#register-form");
  if (props.currentPage === "register") {
    setTimeout(() => {
      if (focus === true) {
        setFocus(false);
        firstInput.focus();
      }
    }, [100]);
  }

  const changeUsername = (e) => {
    setUsername(e.target.value);
  };
  const changeEmailValidation = (e) => {
    setEmailValidation(e.target.value);
  };
  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const registerDiv = document.querySelector(".register-main-container");
  const registerHoover = document.querySelector(".register-hoover");

  const closeRegisterMenu = () => {
    registerDiv.style.display = "none";
    registerHoover.style.display = "none";
    errorMessagesElements.forEach((errorMessage) => {
      errorMessage.style.display = "none";
    });
    inputElements.forEach((inputElem) => {
      inputElem.style.border = "1px solid #ccd0d5";
    });
    errorBtnElements.forEach((errorBtn) => {
      errorBtn.style.display = "none";
    });
    formElem.reset();
    setCurrentInput("username");
    setUsername("");
    setEmail("");
    setEmailValidation("");
    setPassword("");
    setOpenedError("");
    lastClick = "";
    setFocus(true);
    setLastError("");
  };

  let inputs = document.querySelectorAll(".register-input");

  const testOverlay = (e) => {
    if (
      e.target.id !== "register-btn" &&
      e.target.id !== "register-close-img"
    ) {
      if (
        lastError === "username" &&
        e.target.id.split("-")[2] !== "username"
      ) {
        inputUsernameElem.style.border = "1px solid red";
        errorBtnUsername.style.display = "flex";
      }
      if (lastError === "email" && e.target.id.split("-")[2] !== "email") {
        inputEmailElem.style.border = "1px solid red";
        errorBtnEmail.style.display = "flex";
      }
      if (
        lastError === "emailValidation" &&
        e.target.id.split("-")[2] !== "emailValidation"
      ) {
        inputEmailValidationElem.style.border = "1px solid red";
        errorBtnEmailValidation.style.display = "flex";
      }
      if (
        lastError === "password" &&
        e.target.id.split("-")[2] !== "password"
      ) {
        inputPasswordElem.style.border = "1px solid red";
        errorBtnPassword.style.display = "flex";
      }

      lastClick = e.target;

      if (e.target.id.split("-")[1] !== "error") {
        errorMessagesElements.forEach((errorElem) => {
          errorElem.style.display = "none";
        });
      }

      inputs.forEach((input) => {
        if (input.id.split("-")[2] === currentInput) {
          testForValidation(input);
        }
      });

      if (e.target.id.includes("register-input")) {
        let nextInput = e.target.id.split("-")[2];
        setCurrentInput(nextInput);
      }

      if (
        openedError === "username" &&
        e.target.id.split("-")[2] !== "username"
      ) {
        errorBtnUsername.style.display = "flex";
      }
      if (openedError === "email" && e.target.id.split("-")[2] !== "email") {
        errorBtnEmail.style.display = "flex";
      }
      if (
        openedError === "emailValidation" &&
        e.target.id.split("-")[2] !== "emailValidation"
      ) {
        errorBtnEmailValidation.style.display = "flex";
      }
      if (
        openedError === "password" &&
        e.target.id.split("-")[2] !== "password"
      ) {
        errorBtnPassword.style.display = "flex";
      }
    }
  };

  const testForValidation = (input) => {
    if (
      (input.id.split("-")[2] === currentInput &&
        lastClick.id.split("-")[2] === currentInput) ||
      lastClick === ""
    ) {
      // IT MEANS THE INPUT WILL NOT BE TEST
    } else {
      actualTestForValidation(input);
    }
  };

  const actualTestForValidation = (input) => {
    if (input.id.split("-")[2] === "username") {
      if (input.value.length < 3) {
        input.style.border = "1px solid red";
        errorBtnUsername.style.display = "flex";
      } else if (input.value.length > 2) {
        input.style.border = "1px solid #ccd0d5";
        errorBtnUsername.style.display = "none";
      }
    }

    if (input.id.split("-")[2] === "email") {
      if (regex.test(input.value)) {
        input.style.border = "1px solid #ccd0d5";
        errorBtnEmail.style.display = "none";
      } else {
        input.style.border = "1px solid red";
        errorBtnEmail.style.display = "flex";
      }
    }

    if (input.id.split("-")[2] === "emailValidation") {
      if (regex.test(input.value)) {
        input.style.border = "1px solid #ccd0d5";
        errorBtnEmailValidation.style.display = "none";
      } else {
        input.style.border = "1px solid red";
        errorBtnEmailValidation.style.display = "flex";
      }
    }

    if (input.id.split("-")[2] === "password") {
      if (input.value.length > 5) {
        input.style.border = "1px solid #ccd0d5";
        errorBtnPassword.style.display = "none";
      } else {
        input.style.border = "1px solid red";
        errorBtnPassword.style.display = "flex";
      }
    }
  };

  const removeRedBorders = (e) => {
    e.target.style.border = "1px solid #ccd0d5";
    if (e.target.id.split("-")[2] === "username") {
      errorBtnUsername.style.display = "none";
    }
    if (e.target.id.split("-")[2] === "email") {
      errorBtnEmail.style.display = "none";
    }
    if (e.target.id.split("-")[2] === "emailValidation") {
      errorBtnEmailValidation.style.display = "none";
    }
    if (e.target.id.split("-")[2] === "password") {
      errorBtnPassword.style.display = "none";
    }

    if (lastError === "username" && e.target.id.split("-")[2] !== "username") {
      inputUsernameElem.style.border = "1px solid red";
      errorBtnUsername.style.display = "flex";
    }
    if (lastError === "email" && e.target.id.split("-")[2] !== "email") {
      inputEmailElem.style.border = "1px solid red";
      errorBtnEmail.style.display = "flex";
    }
    if (
      lastError === "emailValidation" &&
      e.target.id.split("-")[2] !== "emailValidation"
    ) {
      inputEmailValidationElem.style.border = "1px solid red";
      errorBtnEmailValidation.style.display = "flex";
    }
    if (lastError === "password" && e.target.id.split("-")[2] !== "password") {
      inputPasswordElem.style.border = "1px solid red";
      errorBtnPassword.style.display = "flex";
    }
  };

  const [emailQuery, setEmailQuery] = useState("");

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (emailQuery !== "") {
        if (regex.test(emailQuery.target.value)) {
          hiddenEmailValidationInput.style.display = "block";

          setTimeout(() => {
            hiddenEmailValidationInput.style.opacity = 1;
            setEmail(emailQuery.target.value);
          }, 200);
        } else {
          hiddenEmailValidationInput.style.opacity = 0;
          setTimeout(() => {
            hiddenEmailValidationInput.style.display = "none";
            setEmail(emailQuery.target.value);
          }, 200);
        }
      }
    }, [200]);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [emailQuery]);

  const openedAssociatedError = (e) => {
    e.stopPropagation();
    errorMessagesElements.forEach((errorElem) => {
      errorElem.style.display = "none";
    });

    if (currentInput === "username") {
      inputUsernameElem.style.border = "1px solid red";
      errorBtnUsername.style.display = "flex";
    }
    if (currentInput === "email") {
      inputEmailElem.style.border = "1px solid red";
      errorBtnEmail.style.display = "flex";
    }
    if (currentInput === "emailValidation") {
      inputEmailValidationElem.style.border = "1px solid red";
      errorBtnEmailValidation.style.display = "flex";
    }
    if (currentInput === "password") {
      inputPasswordElem.style.border = "1px solid red";
      errorBtnPassword.style.display = "flex";
    }
    if (lastError === "username") {
      inputUsernameElem.style.border = "1px solid red";
      errorBtnUsername.style.display = "flex";
    }
    if (lastError === "email") {
      inputEmailElem.style.border = "1px solid red";
      errorBtnEmail.style.display = "flex";
    }
    if (lastError === "emailValidation") {
      inputEmailValidationElem.style.border = "1px solid red";
      errorBtnEmailValidation.style.display = "flex";
    }
    if (lastError === "password") {
      inputPasswordElem.style.border = "1px solid red";
      errorBtnPassword.style.display = "flex";
    }

    if (e.currentTarget.id === "username-error") {
      errorMessageElemUsername.style.display = "block";
      errorBtnUsername.style.display = "none";
      inputUsernameElem.style.border = "1px solid #ccd0d5";
      setTimeout(() => {
        inputUsernameElem.focus();
      }, [100]);
      setOpenedError("username");
    }
    if (e.currentTarget.id === "email-error") {
      errorMessageElemEmail.style.display = "block";
      errorBtnEmail.style.display = "none";
      inputEmailElem.style.border = "1px solid #ccd0d5";
      setTimeout(() => {
        inputEmailElem.focus();
      }, [100]);
      setOpenedError("email");
    }
    if (e.currentTarget.id === "emailValidation-error") {
      errorMessageElemEmailValidation.style.display = "block";
      errorBtnEmailValidation.style.display = "none";
      inputEmailValidationElem.style.border = "1px solid #ccd0d5";
      setTimeout(() => {
        inputEmailValidationElem.focus();
      }, [100]);
      setOpenedError("emailValidation");
    }
    if (e.currentTarget.id === "password-error") {
      errorMessageElemPassword.style.display = "block";
      errorBtnPassword.style.display = "none";
      inputPasswordElem.style.border = "1px solid #ccd0d5";
      setTimeout(() => {
        inputPasswordElem.focus();
      }, [100]);
      setOpenedError("password");
    }
    setLastError(e.currentTarget.id.split("-")[0]);
  };

  const canSave =
    username.length > 2 &&
    regex.test(email) &&
    regex.test(emailValidation) &&
    password.length > 5;

  const tryToRegister = (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        dispatch(register({ email, password, username })).unwrap();

        closeRegisterMenu();
      } catch (err) {
        console.error("Failed to save the person", err);
      }
    } else {
      if (username.length < 3) {
        // PK CA AFFICHE LES BORDERS ??
        errorMessageElemUsername.style.display = "block";
        errorBtnUsername.style.display = "flex";
        inputUsernameElem.style.border = "1px solid red";
        return;
      }
      if (regex.test(email)) {
      } else {
        errorMessageElemEmail.style.display = "block";
        errorBtnEmail.style.display = "flex";
        inputEmailElem.style.border = "1px solid red";
        return;
      }
      if (regex.test(emailValidation)) {
      } else {
        errorMessageElemEmailValidation.style.display = "block";
        errorBtnEmailValidation.style.display = "flex";
        inputEmailValidationElem.style.border = "1px solid red";
        return;
      }
      if (password.length < 6) {
        errorMessageElemPassword.style.display = "block";
        errorBtnPassword.style.display = "flex";
        inputPasswordElem.style.border = "1px solid red";
        return;
      }
    }
  };

  return (
    <>
      <div className="register-hoover" onClick={(e) => testOverlay(e)}></div>
      <div className="register-main-container">
        <div className="register-container " onClick={(e) => testOverlay(e)}>
          <div
            id="register-close-container"
            className="register-close-btn-container"
          >
            <img
              id="register-close-img"
              src={crossIcon}
              alt="close register menu"
              className="register-cross-icon"
              onClick={closeRegisterMenu}
            />
          </div>

          <div className="register-header">
            <h2>S'inscrire</h2>
            <p>C'est rapide et facile.</p>
          </div>
          <div className="register-content">
            <form id="register-form">
              <div className="register-input-container">
                <input
                  id="register-input-username"
                  tabIndex="0"
                  className="register-input username"
                  placeholder="Prénom"
                  onChange={(e) => changeUsername(e)}
                  onClick={(e) => removeRedBorders(e)}
                ></input>
                <div
                  className="error-red username"
                  id="username-error"
                  onClick={(e) => openedAssociatedError(e)}
                >
                  <img
                    src={errorRed}
                    alt="error username"
                    id="username-error-img"
                  ></img>
                </div>
                <div className="register-input-error username">
                  Quel est votre nom ?
                  <div className="register-error-arrow"></div>
                </div>
              </div>

              <div className="register-input-container">
                <input
                  id="register-input-email"
                  className="register-input email"
                  placeholder="Adresse e-mail"
                  onClick={(e) => removeRedBorders(e)}
                  onChange={(e) => setEmailQuery(e)}
                ></input>
                <div
                  className="error-red email"
                  id="email-error"
                  onClick={(e) => openedAssociatedError(e)}
                >
                  <img src={errorRed} alt="error email"></img>
                </div>
                <div className="register-input-error email">
                  Vous en aurez besoin pour vous reconnecter ou si vous devez un
                  jour réinitialiser votre mot de passe.
                  <div className="register-error-arrow email"></div>
                </div>
              </div>

              <div className="register-input-container emailValidation">
                <input
                  id="register-input-emailValidation"
                  className="register-input emailValidation"
                  placeholder="Adresse e-mail validation"
                  onChange={(e) => changeEmailValidation(e)}
                  onClick={(e) => removeRedBorders(e)}
                ></input>
                <div
                  className="error-red emailValidation"
                  id="emailValidation-error"
                  onClick={(e) => openedAssociatedError(e)}
                >
                  <img src={errorRed} alt="error emailValidation"></img>
                </div>
                <div className="register-input-error emailValidation">
                  Veuillez saisir de nouveau votre adresse e-mail.
                  <div className="register-error-arrow"></div>
                </div>
              </div>

              <div className="register-input-container">
                <input
                  id="register-input-password"
                  type="password"
                  className="register-input password"
                  placeholder="Nouveau mot de passe"
                  onChange={(e) => changePassword(e)}
                  onClick={(e) => removeRedBorders(e)}
                ></input>
                <div
                  className="error-red password"
                  id="password-error"
                  onClick={(e) => openedAssociatedError(e)}
                >
                  <img src={errorRed} alt="error password"></img>
                </div>
                <div className="register-input-error password">
                  Entrez une combinaison d'un moins six caractères.
                  <div className="register-error-arrow"></div>
                </div>
              </div>

              <div className="register-informations">
                En cliquant sur s'inscrire, vous acceptez que votre email puisse
                tomber entre de mauvaises mains. Mais en utilisant un e-mail
                jetable, comme{" "}
                <a href="https://www.yopmail.com" target="_blank">
                  yopmail.com
                </a>{" "}
                vous ne risquez rien.
              </div>
              <button
                id="register-btn"
                className="register-btn"
                onClick={(e) => tryToRegister(e)}
              >
                S'inscrire
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
