// react
import { useNavigate } from "react-router-dom";
const BASE_URL = process.env.REACT_APP_PROD_BACK_DOMAIN;
const Confirmation = () => {
  const navigate = useNavigate();
  let regex = /=(.*)/;
  let AUTH_TOKEN = window.location.href
    .match(regex)[0]
    .split("")
    .slice(1)
    .join("");

  const activateAccount = async () => {
    const res = await fetch(
      `${BASE_URL}/users/confirmation?confirmation_token=${AUTH_TOKEN}`
    );
    const data = res.json();
  };

  activateAccount().then(() => {
    navigate("/");
  });

  return <></>;
};

export default Confirmation;
