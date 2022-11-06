
import LoginFail from "./LoginFail";
import LoaderFailedConnexion from "./LoaderFailedConnexion"
const ContentFailed = () => {
  return (
    <div className="content-failed-main-container">
      <LoaderFailedConnexion/>
      <div className="content-failed-main-container2">
        <div className="content-failed-header">clonebook</div>
        <div className="content-failed-auth-main-container">
          <LoginFail />
        </div>
      </div>
    </div>
  );
};

export default ContentFailed;
