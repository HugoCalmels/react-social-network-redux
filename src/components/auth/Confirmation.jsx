// react
import { useNavigate } from "react-router-dom";

const Confirmation = () => {
  // a simple blank page to get the url query, then redirect if the query is correct

  const navigate = useNavigate()
  let regex = /=(.*)/
  let AUTH_TOKEN = window.location.href.match(regex)[0].split('').slice(1).join('')

  const activateAccount = async () => {
    await fetch(`http://localhost:3000/users/confirmation?confirmation_token=${AUTH_TOKEN}`)
  }

  activateAccount().then(() => {
    navigate('/')
  })
  
  return (
    <>
    </>
  )
}

export default Confirmation