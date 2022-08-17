import Footer from "./Footer"
import {useState} from 'react'
import { changePassword } from "../../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export const NewPassword = () => {

  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const url = window.location.href

  const regex = /(?<=token=).*$/

  //let AUTH_TOKEN = window.location.href.match(regex)[0].split('').slice(1).join('')

  let TOKEN = window.location.href.match(regex)[0]

  console.log(TOKEN)

  console.log('OOOOOOOOO')
  console.log(password)
  console.log(passwordConfirmation)
  console.log('OOOOOOOOOO')

  const canSave = password === passwordConfirmation && password.length > 5

  const tryToDefineNewPassword = () => {
    if (canSave) {
      dispatch(changePassword({ password, passwordConfirmation, TOKEN })).unwrap()
      navigate('/')
    } else {
      console.log('passwords do not match')
    }
  }
  
  return (
    <div className="new-password-main-container">
      <div className="new-password-container">
        <div className="new-password-container-2">
          <div className="new-password-header">
            <h2>Définir un nouveau mot de passe </h2>
          </div>
          <div className="new-password-middle">
            <input type="password" className="new-password-input" placeholder="Nouveau mot de passe" onChange={(e) => setPassword(e.target.value)}></input>
            <input type="password" className="new-password-input" placeholder="Confirmation du mot de passe" onChange={(e) => setPasswordConfirmation(e.target.value)}></input>
          </div>
          <div className="new-password-btns">
            <button className="new-password-btn confirm" onClick={tryToDefineNewPassword}>Confirmer</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default NewPassword