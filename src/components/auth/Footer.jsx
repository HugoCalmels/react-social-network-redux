

const Footer = () => {
  
  return (
    <>
       <div className="authentication-footer">
          <div className="auth-footer-container">
            <div className="auth-footer-content-title">
              Ceci est un projet personnel, qui a pour but de répliquer le célèbre réseau social "Facebook".
              </div>
              
        <ul className="auth-footer-content-content">
        <li>L'utilisateur peut s'enregistrer sur le site. Il peut poster, modifier ou supprimer du contenu ( écrit, ou fichier image ).</li>
              <li>Chaque post est likable et commentable. Chaque commentaire est modifiable.</li>
              <li>L'utilisateur a peut envoyer une demande d'amis, qui sera recue dans les notifications.</li>
              <li>Chaque utilisateur a une liste d'amis, ainsi qu'une liste de suggestion d'amis par nombre d'amis en commun.</li>
              <li>Une searchbar est disponible pour rechercher n'importe quel utilisateur. Un historique de la searchbar est aussi disponible.</li>
          </ul>
          <div className="footer-custom-hr"></div>
            <div className="auth-footer-author">Hugo Calmels &#xA9; 2022</div>
            </div>
      </div>
    </>
  )
}


export default Footer