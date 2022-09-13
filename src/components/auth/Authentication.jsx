
import { useEffect } from "react";
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
    if (nextAction === "succeeded auth") {
      navigate('/')
      dispatch(resetNextAction()).unwrap()
    }
    if (nextAction === "failed auth") {
      navigate("/failed-to-login")
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
