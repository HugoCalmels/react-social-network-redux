import { useEffect, useState } from "react";
import Footer from "../auth/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getUserByEmail2, getUserStatusAfterFailedLogin,selectUserByEmail } from "../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
const ForgottenPassword = () => {
  const hoover = document.querySelector(".auth-hoover");
  const navigate = useNavigate()

  const state = useSelector(getUserStatusAfterFailedLogin)
  const userFound = useSelector(selectUserByEmail)

  const [email, setEmail] = useState("");
  let error = false

  const dispatch = useDispatch();

  if (hoover !== null) {
    hoover.addEventListener("click", () => {
      let input = document.querySelector(".forgotten-input-search-account");
      input.classList.remove("active");
    });
  }

  console.log('/////////')
  console.log(userFound)
  console.log(userFound.length)
  console.log('/////////')
 

  useEffect(() => {
    console.log('/////////')
    console.log(userFound)
    console.log(userFound.length)
    console.log('/////////')
    if (userFound !== '' && userFound !== 'error') {
      if (userFound.length === 0) {
        
      } else {
        navigate('/reset-password')
      }
    
    }

  }, [userFound])
  const hoverTheInput = (e) => {
    console.log(e.target);
    e.target.classList.add("active");
    if (hoover !== null) {
      hoover.classList.add("active");
    }

  };

  const searchForAccount = (e) => {
    e.preventDefault()
    dispatch(getUserByEmail2(email)).unwrap()
    checkErrorMessages()
  }

  const nagivateToAuth = () => {
    navigate('/')
  }



  const [errorMessages, setErrorMessages] = useState('')
  


  const checkErrorMessages = () => {
    console.log('I DONT WHEN THIS SHIET TRIGGERS OMG')
    console.log('I DONT WHEN THIS SHIET TRIGGERS OMG')
    console.log('I DONT WHEN THIS SHIET TRIGGERS OMG')
    console.log('I DONT WHEN THIS SHIET TRIGGERS OMG')
    console.log('I DONT WHEN THIS SHIET TRIGGERS OMG')
    console.log(userFound)
    console.log('I DONT WHEN THIS SHIET TRIGGERS OMG')
    let errorTitle = ''
    let errorInfos = ''
    if (userFound === 'error' || userFound === '') {
      if (email.length === 0) {
        errorTitle = 'Veuillez remplir au moins un champ'
        errorInfos = 'Remplissez au moins un champ pour rechercher votre compte'
  
      } else if (email.length < 3) {
        errorTitle = `L'identifiant que vous avez saisi est trop court`
        errorInfos = 'Please enter a longer search term'
  
      } else  {
        errorTitle = 'Aucun résultat de recherche'
        errorInfos = `Votre recherche ne donne aucun résultat. Veuillez réessayer avec d'autres informations`
  
      } 
  

      setErrorMessages(
          <div className="forgotten-error-messages">
          <h4>{errorTitle}</h4>
          <p>{errorInfos}</p>
          </div>)
      

    }

  

    
  
  }

  useEffect(() => {
    
  }, [errorMessages])



  return (
    <div className="forgotten-password-container">
      <div className="forgotten-password-content">
        <div className="forgotten-password-content-2">
          <div className="forgotten-header">
            <h2>Trouvez votre compte</h2>
          </div>
          <div className="forgotten-middle">
            {errorMessages}
            <div className="forgotten-middle-instructions">
              Veuillez entrer votre adresse e-mail ou votre numéro de mobile
              pour rechercher votre compte.
            </div>
            <input
              className="forgotten-input-search-account"
              type="text"
              placeholder="Adresse e-mail ou numéro de mobile"
              onClick={(e) => hoverTheInput(e)}
              onChange={(e)=>setEmail(e.target.value)}
            ></input>
          </div>
          <div className="forgotten-buttons">
            <button className="forgotten-btn cancel" onClick={nagivateToAuth}>Annuler</button>
            <button className="forgotten-btn search"
            onClick={(e)=>searchForAccount(e)}>Rechercher</button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ForgottenPassword;
