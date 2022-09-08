const TopProfileNavigation = (props) => {
  return (
    <div className="profile-navbar-container">
      <div className="profile-navbar">
        <div className="profile-navbar-navigation">
          <div
            className="profile-navbar-option publications"
            onClick={(e) => props.setBottomContent("publications")}
          >
           <div className="pno-fix">
              Publications
              <div className="profile-blue-line-container">
                <div className="profile-blue-line"></div>
              </div>
              </div>
          </div>
          <div
            className="profile-navbar-option amis"
            onClick={(e) => props.setBottomContent("amis")}
          >
            <div className="pno-fix">
              Amis
              <div className="profile-blue-line-container">
                <div className="profile-blue-line"></div>
              </div>
            </div>
          </div>
          <div
            className="profile-navbar-option photos"
            onClick={(e) => props.setBottomContent("photos")}
          >
              <div className="pno-fix">
              Photos
              <div className="profile-blue-line-container">
                <div className="profile-blue-line"></div>
              </div>
              </div>
          </div>
        </div>
        {/*
             <div className="profile-navbar-dropdown-menu">
            <img src={dotsMenuIcon} alt="profile-dropdown-menu"/>
          </div>
            */}
      </div>
    </div>
  );
};

export default TopProfileNavigation;
