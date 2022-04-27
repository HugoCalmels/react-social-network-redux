
import { useNavigate } from "react-router-dom";
const Confirmation = () => {

  const navigate = useNavigate()

  let regex = /=(.*)/

  let AUTH_TOKEN = window.location.href.match(regex)[0].split('').slice(1).join('')

  console.log(AUTH_TOKEN)

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