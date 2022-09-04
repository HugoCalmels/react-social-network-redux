import clonebookIcon from "../../assets/svgs/clonebookIcon.svg"
import welcomeImage from "../../assets/images/bienvenue.jpg"

const FakePost = () => {
  return (
    <div className="fake-post-wrapper">
      <div className="fake-post-header">
        <div className="fake-post-header-avatar"><img src={clonebookIcon} alt="clonebook"></img></div>
        <div className="fake-post-header-author">Clonebook</div>

      </div>
      <div className="fake-post-body">
        <div className="fake-post-body-text">
          <h5>Bienvenue sur Clonebook.</h5>
          <p>Seuls vos posts et ceux de vos amis sont affichés dans le fil de publications.</p>
          <p>Connectez vous avec d'autres utilisateurs pour partager et échanger librement.</p>
          <p>Lancez vous et créez votre premier post !</p>
        </div>
        <div className="fake-post-body-image"><img src={welcomeImage} alt="welcome image"/></div>
      </div>
    </div>
  )
}

export default FakePost