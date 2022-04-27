import Login from "./Login";
import Register from "./Register";
import '../../Styles/Authentication/Index.scss';
import { useState } from "react";


const Authentication = () => {

  const [isRegistering, setIsRegistering] = useState(false)

  return (
    <>
    <div className="authentication">
      <div className="auth-container">
      <div className="auth-header-container">
        <h2>clonebook</h2>
        <h5>Avec Clonebook, partagez et restez en contact avec votre entourage.</h5>
      </div>
      <div className="auth-main-container">
       {isRegistering ? <Register setIsRegistering={setIsRegistering}/>: <Login setIsRegistering={setIsRegistering}/>}
      </div>
      </div>
      


    </div>

    <div className="auth-footer">
        Footer, traduction i18Next ... not willing to do it actually.
    </div>
      </>
  )
}


export default Authentication