// react
import { useEffect } from "react";
// components
// others
import "../../Styles/Authentication/Index.scss";
import Content from "./Content";
import Footer from "./Footer";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserErrorStatus,
  getUserStatus,
  getAuthNextAction,
  resetNextAction
} from "../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Authentication = (props) => {
  const navigate = useNavigate();
  const error = useSelector(getUserErrorStatus);
  const usersStatus = useSelector(getUserStatus);
  const nextAction = useSelector(getAuthNextAction)

  const dispatch = useDispatch()

  let currentPage = null || error;

  useEffect(() => {

    // IL EST LA LE TRUC QUI ME FAIT CHIER, je fous le truc dans redux et basta.

    /*
    if (currentPage !== null) {
      navigate("/failed-to-login");

      currentPage = null;
    } else {
      navigate("/");
      currentPage = null;
    }
    */
    if (nextAction === "succeeded auth") {
      console.log('trying to nav home')
      navigate('/')
      dispatch(resetNextAction()).unwrap()
    }
    if (nextAction === "failed auth") {
      navigate("/failed-to-login")
      console.log('trying to nav failed')
      dispatch(resetNextAction()).unwrap()
    }
    
  }, [usersStatus]);

  return (
    <>
      <div className="authentication-container">
        <Content
          setCurrentPage={props.setCurrentPage}
          currentPage={props.currentPage}
        />

        <Footer />
      </div>
    </>
  );
};

export default Authentication;
