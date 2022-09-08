// react
import { useEffect } from "react";
// components
// others
import "../../Styles/Authentication/Index.scss";
import Content from "./Content";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import {
  getUserErrorStatus,
  getUserStatus,
} from "../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Authentication = (props) => {
  const navigate = useNavigate();
  const error = useSelector(getUserErrorStatus);
  const usersStatus = useSelector(getUserStatus);

  let currentPage = null || error;

  useEffect(() => {
    if (currentPage !== null) {
      navigate("/failed-to-login");

      currentPage = null;
    } else {
      navigate("/");
      currentPage = null;
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
