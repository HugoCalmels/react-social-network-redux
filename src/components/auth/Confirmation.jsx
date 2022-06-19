// react
import { useNavigate } from "react-router-dom";
const BASE_URL = process.env.REACT_APP_PROD_BACK_DOMAIN
const Confirmation = () => {
  // a simple blank page to get the url query, then redirect if the query is correct

  const navigate = useNavigate()
  let regex = /=(.*)/
  let AUTH_TOKEN = window.location.href.match(regex)[0].split('').slice(1).join('')

  const activateAccount = async () => {
    const res = await fetch(`${BASE_URL}/users/confirmation?confirmation_token=${AUTH_TOKEN}`)
    const data = res.json()
    console.log('999999999999999999999999')
    console.log(`${BASE_URL}/users/confirmation?confirmation_token=${AUTH_TOKEN}`)
    console.log(data)
    console.log('999999999999999999999999')
    
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