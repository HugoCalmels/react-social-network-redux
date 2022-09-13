import Footer from "../../components/auth/Footer";
import {
  resetPassword,
  selectUserByEmail,
  cancelSearchedAccount,
  selectLastUserFound,
} from "../../redux/features/auth/authSlice";
import defaultProfile from "../../assets/images/defaultProfile.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const ResetPassword = () => {
  const userFound = useSelector(selectUserByEmail);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userFoundLast = useSelector(selectLastUserFound);

  const tryResetPassword = () => {
    dispatch(resetPassword(userFoundLast.email)).unwrap();
    navigate("/");
  };

  const navigateToAuth = () => {
    navigate("/forgotten-password");
    dispatch(cancelSearchedAccount());
  };

  useEffect(() => {
    if (userFoundLast === "error") {
      navigate("/forgotten-password");
    }
  }, [userFound]);

  return (
    <div className="reset-password-container">
      <div className="reset-password-content">
        <div className="reset-password-content-2">
          <div className="reset-password-header">
            <h2> Réinitialiser votre mot de passe</h2>
          </div>
          <div className="reset-password-middle">
            <div className="reset-password-middle-left">
              <div className="reset-password-middle-left-instructions">
                Comment voulez-vous recevoir votre code de réinitialisation du
                mot de passe ?
              </div>
              <div className="reset-password-middle-left-content">
                <input className="rp-radio" type="radio" checked="1"></input>
                <div className="reset-password-middle-left-small-grid">
                  <div className="rp-sg-1">Envoyer le code par e-mail</div>
                  <div className="rp-sg-2">{userFoundLast.email}</div>
                </div>
              </div>
            </div>
            <div className="reset-password-middle-right">
              <div className="reset-password-middle-right-avatar">
                {userFoundLast.avatar_link !== null ? (
                  <>
                    <img
                      src={userFoundLast.avatar_link}
                      alt="avatarImage"
                    ></img>
                  </>
                ) : (
                  <>
                    <img src={defaultProfile} alt="avatarImage"></img>
                  </>
                )}
              </div>
              <div className="reset-password-middle-right-user">
                <div className="middle-right-user-email">
                  {userFoundLast.email}
                </div>
                <div className="middle-right-user-user">
                  Utilisateur de Clonebook
                </div>
              </div>
            </div>
          </div>
          <div className="reset-password-btns">
            <button
              className="reset-password-btn cancel"
              onClick={navigateToAuth}
            >
              Ce n'est pas vous ?
            </button>
            <button
              className="reset-password-btn continue"
              onClick={tryResetPassword}
            >
              Continuer
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResetPassword;
