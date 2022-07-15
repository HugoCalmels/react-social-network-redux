import "../Styles/friends/index.scss"
import FriendsPageMenu from "../components/friends/FriendsPageMenu.jsx"
import FriendsPageContent from "../components/friends/FriendsPageContent.jsx"
import {useState} from 'react'

const Friends = () =>{

  const [menuSelected, setMenuSelected] = useState('all-friends')

  return (
    <div className="friends-page-wrapper">
      <FriendsPageMenu setMenuSelected={setMenuSelected} menuSelected={ menuSelected} />
      <FriendsPageContent setMenuSelected={setMenuSelected} menuSelected={ menuSelected}/>
    </div>
  )
}

export default Friends