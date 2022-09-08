import Login from "./Login";
const Content = (props) => {
  return (
    <>
      <div className="authentication-main-container">
        <div className="authentication-main">
          <div className="auth-main-intro">
            <div className="auth-main-intro-container">
              <div className="auth-main-intro-title">clonebook</div>
              <div className="auth-main-intro-text">
                Avec Clonebook, partagez et restez en contact avec votre
                entourage.
              </div>
            </div>
          </div>
          <div className="auth-main-form">
            <div className="auth-main-form-container">
              <Login />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Content;
