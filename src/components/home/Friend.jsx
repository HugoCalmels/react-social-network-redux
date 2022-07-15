import defaultProfile from "../../assets/images/defaultProfile.jpg";

const Friend = (props) => {


  const reworkedLastSeen = props.el.friend.last_seen.split(/[-T]+/);

  //const year = reworkedLastSeen[0]

  const lastSeenHoursAndMinutes = reworkedLastSeen[3].substring(0, 5);

  const lastSeenHours = lastSeenHoursAndMinutes.substring(0, 2)
  const lastSeenMinutes = lastSeenHoursAndMinutes.substring(3, 5)

  const totalLastSeenInMinutes = parseInt(lastSeenHours * 60)+parseInt(lastSeenMinutes)

  let timeNow = new Date()
  const totalTimeNowInMinutes = (timeNow.getHours() * 60) + timeNow.getMinutes()


  const timeGap = totalTimeNowInMinutes - totalLastSeenInMinutes


  console.log("@@@@@ FRIEND! @@@@@@@@@@");
  console.log(lastSeenHours)
  console.log(lastSeenMinutes)
  console.log(totalLastSeenInMinutes)
  //console.log(timeNow.getHours())
  //console.log(timeNow.getMinutes())
  console.log(totalTimeNowInMinutes)
  console.log(timeGap)
  console.log("@@@@@ FRIEND! @@@@@@@@@@");

 



  return (
    <>
      {timeGap < 30 ?
        <>
          <div className="friendlist-friend">
                  <div className="friendlist-friend-avatar">
                  {props.el.friend.avatar_link !== null ? (
                <>
            <img src={props.el.friend.avatar_link} alt="avatarImage"></img>
            
            <div className="friendlist-friend-lastseen-container">
                          <div className="friendlist-friend-lastseen"></div>
                          </div>
                </>
              ) : (
                <>
                    <img src={defaultProfile} alt="avatarImage"></img>
                    <div className="friendlist-friend-lastseen-container">
                          <div className="friendlist-friend-lastseen"></div>
                          </div>
                </>
              )}
                  </div>
            <div className="friendlist-friend-username">{props.el.friend.username}</div>
                       
      </div>
        </>
        : ''}
    
      </>
  )
}

export default Friend