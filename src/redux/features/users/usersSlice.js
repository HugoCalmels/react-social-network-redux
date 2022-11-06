import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const BASE_URL = process.env.REACT_APP_PROD_BACK_DOMAIN


const initialState = {
  users: [],
  status: 'idle', // differents value : 'iddle' | 'loading' |'succeeded' | 'failed'
  error: null,
  currentInvitation: [],
  profileStatus: 'idle',
  currentUser: [],
  friendList: [],
  friendListStatus: 'idle',
  selectedFriendList: [],
  invitationsList: [],
  invitationsStatus: 'idle',
  imageUploadStatus: 'idle',
  profileStatusFromUser: 'idle',
  currentInvitationsList: [],
  userNavbarStatus: 'idle',
  usernamesList: [],
  commonFriendships: [],
  suggestions: [],
  selectedUserCommonFriends: [],
  selectedUserCommonFriendsStatus: "idle",
  usernamesStatus: "idle"
}

/*
export const getAllUsers  = createAsyncThunk('users/getAllUsers', async (initialPost) => {
  const config = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Cookies.get('auth-token')}`
    }
  }
  const response = await fetch(`${BASE_URL}/api/v1/users`, config)
  const data = await response.json()


  return data
})
*/

// AVATAR POST
export const createAvatar = createAsyncThunk('users/createAvatar', async (payload) => {
  const config = {
    method: 'POST',
    headers: {

      "Authorization": `Bearer ${Cookies.get('auth-token')}`
    },
    body: payload.formDataUser
  }
  let response = []
  let data = []
  try {
    response = await fetch(`${BASE_URL}/api/v1/createAvatar`, config)
    data = await response.json()
  } catch (e) {
    console.log(e)
  }

  // THEN GET LAST AVATAR POSTED
  const config2 = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Cookies.get('auth-token')}`
    },
  };
  let response2 = []
  let data2 = []
  try {
    response2 = await fetch(`${BASE_URL}/api/v1/latestAvatar`, config2)
    data2 = await response2.json()
  } catch (e) {
    console.log(e)
  }

  // update the user 
  const body3 = {
    username: payload.user.username,
    email: payload.user.emaim,
    id: payload.user.id,
    avatar_link: data2.image_url, // just change the image_link actually
  }
  const config3 = {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Cookies.get('auth-token')}`
    },
    body: JSON.stringify(body3)
  };
  let response3 = []
  let data3 = []
  try {
    response3 = await fetch(`${BASE_URL}/api/v1/users/${payload.user.id}`, config3)
    data3 = await response3.json()
  } catch (e) {
    console.log(e)
  }

  // hmm get the user ...
  const author = JSON.parse(Cookies.get('user'))
  const config4 = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Cookies.get('auth-token')}`
    },
  };
  let response4 = []
  let data4 = []
  try {
    response4 = await fetch(`${BASE_URL}/api/v1/users/${author.id}`, config4)
    data4 = await response4.json()
  } catch (e) {
    console.log(e)
  }

  return data4

})

// CREATE THUMBNAIL
export const createThumbnail = createAsyncThunk('users/createThumbnail', async (payload) => {
  const config = {
    method: 'POST',
    headers: {

      "Authorization": `Bearer ${Cookies.get('auth-token')}`
    },
    body: payload.formDataUser
  }
  let response = []
  let data = []
  try {
    response = await fetch(`${BASE_URL}/api/v1/createThumbnail`, config)
    data = await response.json()
  } catch (e) {
    console.log(e)
  }

  // THEN GET LAST AVATAR POSTED
  const config2 = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Cookies.get('auth-token')}`
    },
  };
  let response2 = []
  let data2 = []
  try {
    response2 = await fetch(`${BASE_URL}/api/v1/latestThumbnail`, config2)
    data2 = await response2.json()
  } catch (e) {
    console.log(e)
  }

  // update the user 
  const body3 = {
    username: payload.user.username,
    email: payload.user.emaim,
    id: payload.user.id,
    thumbnail_link: data2.image_url, // just change the image_link actually
  }
  const config3 = {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Cookies.get('auth-token')}`
    },
    body: JSON.stringify(body3)
  };
  let response3 = []
  let data3 = []
  try {
    response3 = await fetch(`${BASE_URL}/api/v1/users/${payload.user.id}`, config3)
    data3 = await response3.json()
  } catch (e) {
    console.log(e)
  }
  // hmm get the user ...
  const author = JSON.parse(Cookies.get('user'))
  const config4 = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Cookies.get('auth-token')}`
    },
  };
  let response4 = []
  let data4 = []
  try {
    response4 = await fetch(`${BASE_URL}/api/v1/users/${author.id}`, config4)
    data4 = await response4.json()
  } catch (e) {
    console.log(e)
  }

  return data4

})



export const addSomeoneToFriendList = createAsyncThunk('users/addSomeoneToFriendList', async (payload) => {



  const body = {
    sender_id: payload.user_id,
    receiver_id: payload.receiver_id,
  }
  const config = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Cookies.get('auth-token')}`
    },
    body: JSON.stringify(body)
  };
  let response = []
  let data = []
  try {
    response = await fetch(`${BASE_URL}/api/v1/invitations`, config)
    data = await response.json()
  } catch (e) {
    console.log(e)
  }


  // get current user
  /*
  const author = JSON.parse(Cookies.get('user'))
  const config2 = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Cookies.get('auth-token')}`
    },
  };
  let response2 = []
  let data2 = []
  try {
    response2 = await fetch(`${BASE_URL}/api/v1/users/${author.id}`, config2)
    data2 = await response2.json()
  } catch (e) {
    console.log(e)
  }
  return {currentInvit:data, currentUser:data2}
  */
  return data
})



export const cancelFriendRequest = createAsyncThunk('users/cancelFriendRequest', async (payload) => {

  const config = {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Cookies.get('auth-token')}`
    },
  };
  let response = []
  let data = []
  try {
    response = await fetch(`${BASE_URL}/api/v1/invitations/${payload}`, config)
    data = await response.json()
  } catch (e) {
    console.log(e)
  }
  return
})

export const getCurrentUser = createAsyncThunk('users/getCurrentUser', async (payload) => {
  const author = JSON.parse(Cookies.get('user'))
  const config2 = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Cookies.get('auth-token')}`
    },
  };
  let response2 = []
  let data2 = []
  try {
    response2 = await fetch(`${BASE_URL}/api/v1/users/${author.id}`, config2)
    data2 = await response2.json()
  } catch (e) {
    console.log(e)
  }

  return data2
})


export const sendInvitationConfirmation = createAsyncThunk('users/sendInvitationConfirmation', async (payload) => {
 //DELETE THE INVIT


 const config2 = {
   method: 'DELETE',
   headers: {
     "Content-Type": "application/json",
     "Authorization": `Bearer ${Cookies.get('auth-token')}`
   },
 };
 let response2 = []
 let data2 = []
 try {
   response2 = await fetch(`${BASE_URL}/api/v1/invitations/${payload.invit_id}`, config2)
   data2 = await response2.json()
 } catch (e) {
   console.log(e)
 }
  console.log(response2)

  // ADD A NEW FRIEND
  const body = {
    friendship: {
      user_id: payload.user_id,
      friend_id: payload.friend_id,
    }
  }
  const config = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Cookies.get('auth-token')}`
    },
    body: JSON.stringify(body)
  };
  let response = []
  let data = []
  try {
    response = await fetch(`${BASE_URL}/api/v1/users/${payload.user_id}/friendships`, config)
    data = await response.json()
  } catch (e) {
    console.log(e)
  }



  const body2 = {
    friendship: {
      user_id:  payload.friend_id,
      friend_id: payload.user_id,
    }

  }
  const config3 = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Cookies.get('auth-token')}`
    },
    body: JSON.stringify(body2)
  };
  let response3 = []
  let data3 = []
  try {
    response3 = await fetch(`${BASE_URL}/api/v1/users/${payload.friend_id}/friendships`, config3)
    data3 = await response3.json()
  } catch (e) {
    console.log(e)
  }

})



export const getCurrentUserFriendlist = createAsyncThunk('users/getCurrentUserFriendlist', async (payload) => {

  const author = JSON.parse(Cookies.get('user'))
  const config2 = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Cookies.get('auth-token')}`
    },
  };
  let response2 = []
  let data2 = []
  try {
    response2 = await fetch(`${BASE_URL}/api/v1/users/${payload}/friendships`, config2)
    data2 = await response2.json()
  } catch (e) {
    console.log(e)
  }
  return data2
})
 
export const getSelectedUserFriendList = createAsyncThunk('users/getSelectedUserFriendList', async (payload) => {

  const author = JSON.parse(Cookies.get('user'))
  const config2 = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Cookies.get('auth-token')}`
    },
  };
  let response2 = []
  let data2 = []
  try {
    response2 = await fetch(`${BASE_URL}/api/v1/users/${payload}/friendships`, config2)
    data2 = await response2.json()
  } catch (e) {
    console.log(e)
  }

  return data2
 })


export const updateInvitationStatus = createAsyncThunk('users/updateInvitationStatus', async (payload) => {
  

  const body3 = {
    invitation: {
      seen: true,
      confirmed: false,
      id: payload.id,
      receiver_id: payload.receiver_id,
      sender_id: payload.sender_id,
    }

  }
  const config3 = {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Cookies.get('auth-token')}`
    },
    body: JSON.stringify(body3)
  };
  let response3 = []
  let data3 = []
  try {
    response3 = await fetch(`${BASE_URL}/api/v1/invitations/${payload.id}`, config3)
    data3 = await response3.json()
  } catch (e) {
    console.log(e)
  }


})


export const removeSomeoneFromFriendlist = createAsyncThunk('users/removeSomeoneFromFriendlist', async (payload) => {
  // REMOVE A FRIEND

  // je supprime la 2nd request avec -1 c'est nimp. faudrait une route dans le backend pour supprimer 2
  // friendships d'un coup


  const config = {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Cookies.get('auth-token')}`
    },

  };
  let response = []
  let data = []
  try {
    response = await fetch(`${BASE_URL}/api/v1/friendships/${payload.friendship1}`, config)
    data = await response.json()
  } catch (e) {
    console.log(e)
  }


  const config2 = {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Cookies.get('auth-token')}`
    },

  };
  let response2 = []
  let data2 = []
  try {
    response2 = await fetch(`${BASE_URL}/api/v1/friendships/${payload.friendship2}`, config2)
    data2 = await response2.json()
  } catch (e) {
    console.log(e)
  }




})


export const addUserToCustomFriendist = createAsyncThunk('users/addUserToCustomFriendist', async (payload) => {
  const author = JSON.parse(Cookies.get('user'))
  const config2 = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Cookies.get('auth-token')}`
    },
  };
  let response2 = []
  let data2 = []
  try {
    response2 = await fetch(`${BASE_URL}/api/v1/users/${payload}`, config2)
    data2 = await response2.json()
  } catch (e) {
    console.log(e)
  }
  return data2

})



export const getCurrentUserInvitationsList = createAsyncThunk('users/getCurrentUserInvitationsList', async (payload) => {
  const config2 = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Cookies.get('auth-token')}`
    },
  };
  let response2 = []
  let data2 = []
  try {
    response2 = await fetch(`${BASE_URL}/api/v1/invitations`, config2)
    data2 = await response2.json()
  } catch (e) {
    console.log(e)
  }
  return data2
})


export const refuseInvitation = createAsyncThunk('users/refuseInvitation', async (payload) => {
  const config2 = {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Cookies.get('auth-token')}`
    },
  };
  let response2 = []
  let data2 = []
  try {
    response2 = await fetch(`${BASE_URL}/api/v1/invitations/${payload}`, config2)
    data2 = await response2.json()
  } catch (e) {
    console.log(e)
  }
   console.log(response2)
})



export const markInvitationAsSeen = createAsyncThunk('users/markInvitationAsSeen', async (payload) => {
  const body3 = {
    seen: true,
  }
  const config3 = {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Cookies.get('auth-token')}`
    },
    body: JSON.stringify(body3)
  };
  let response3 = []
  let data3 = []
  try {
    response3 = await fetch(`${BASE_URL}/api/v1/invitations/${payload}`, config3)
    data3 = await response3.json()
  } catch (e) {
    console.log(e)
  }
})



export const updateCurrentUserLastSeen = createAsyncThunk('users/updateCurrentUserLastSeen', async (payload) => {

  const config3 = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Cookies.get('auth-token')}`
    },
  };
  let response3 = []
  let data3 = []
  try {
    response3 = await fetch(`${BASE_URL}/api/v1/updateLastSeen/${payload}`, config3)
    data3 = await response3.json()
  } catch (e) {
    console.log(e)
  }
})



export const getAllUsernames = createAsyncThunk('users/getAllUsernames', async (payload) => {
  const config3 = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Cookies.get('auth-token')}`
    },
  };
  let response3 = []
  let data3 = []
  try {
    response3 = await fetch(`${BASE_URL}/api/v1/getAllUsernames`, config3)
    data3 = await response3.json()
  } catch (e) {
    console.log(e)
  }
  return data3
})






export const getCurrentUserSuggestions = createAsyncThunk('users/getCurrentUserSuggestions', async (payload) => {
  const author = JSON.parse(Cookies.get('user'))
  const config3 = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Cookies.get('auth-token')}`
    },
  };
  let response3 = []
  let data3 = []
  try {
    response3 = await fetch(`${BASE_URL}/api/v1/users/${author.id}/suggestions`, config3)
    data3 = await response3.json()
  } catch (e) {
    console.log(e)
  }
  return data3
})

export const getCurrentUserCommonFriends = createAsyncThunk('users/getCurrentUserCommonFriends', async (payload) => {
  const author = JSON.parse(Cookies.get('user'))
  const config3 = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Cookies.get('auth-token')}`
    },
  };
  let response3 = []
  let data3 = []
  try {
    response3 = await fetch(`${BASE_URL}/api/v1/users/${author.id}/common_friendships`, config3)
    data3 = await response3.json()
  } catch (e) {
    console.log(e)
  }
  return data3
})


export const getSelectedUserCommonFriends = createAsyncThunk('users/getSelectedUserCommonFriends', async (payload) => {
  const author = JSON.parse(Cookies.get('user'))
  const config3 = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Cookies.get('auth-token')}`
    },
  };
  let response3 = []
  let data3 = []
  try {
    response3 = await fetch(`${BASE_URL}/api/v1/selectedUserCM/${payload}`, config3)
    data3 = await response3.json()
  } catch (e) {
    console.log(e)
  }

  return data3
})

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder

      /*
    .addCase(getAllUsers.pending, (state, action) => {
      state.status = "loading"

    })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = action.payload
      state.status = "succeeded"

    })
    .addCase(getAllUsers.rejected, (state, action) => {
      state.status = "failed"

    })
    */
    .addCase(createAvatar.pending, (state, action) => {
      state.imageUploadStatus = "loading"
    })
      .addCase(createAvatar.fulfilled, (state, action) => {
      const users = state.users.filter((user) => user.id !== action.payload.id)
        state.users = [...users, action.payload]
        state.currentUser = action.payload
      state.imageUploadStatus = "succeeded"
    })
    .addCase(createAvatar.rejected, (state, action) => {
      state.imageUploadStatus = "failed"
    })
    .addCase(createThumbnail.pending, (state, action) => {
      state.imageUploadStatus = "loading"
    })
      .addCase(createThumbnail.fulfilled, (state, action) => {
      const users = state.users.filter((user) => user.id !== action.payload.id)
      state.users = [...users, action.payload]
      state.imageUploadStatus = "succeeded"
    })
    .addCase(createThumbnail.rejected, (state, action) => {
      state.imageUploadStatus = "failed"
    })
    // POST INVITATION
    .addCase(addSomeoneToFriendList.pending, (state, action) => {
      state.invitationsStatus = "loading"

    })
    .addCase(addSomeoneToFriendList.fulfilled, (state, action) => {
      //state.currentInvitation = action.payload.currentInvit
      //state.currentUser = action.payload.currentUser
      state.currentInvitation = action.payload
      state.invitationsStatus = "succeeded"
 

    })
    .addCase(addSomeoneToFriendList.rejected, (state, action) => {
      state.invitationsStatus = "failed"

    })
    .addCase(cancelFriendRequest.pending, (state, action) => {
      state.invitationsStatus = "loading"

    })
      .addCase(cancelFriendRequest.fulfilled, (state, action) => {
       // state.currentUser = action.payload.currentUser
      state.currentInvitation = ''
      state.invitationsStatus = "succeeded"

    })
    .addCase(cancelFriendRequest.rejected, (state, action) => {
      state.invitationsStatus = "failed"

    })
    .addCase(getCurrentUser.pending, (state, action) => {
      state.invitationsStatus = "loading"
      state.status = "loading"
    })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
      state.currentUser = action.payload
      state.profileStatus = "succeeded"
        state.status = "succeeded"
    })
    .addCase(getCurrentUser.rejected, (state, action) => {
      state.profileStatus = "failed"
      state.status = "failed"
    })
    .addCase(sendInvitationConfirmation.pending, (state, action) => {
      //state.profileStatus = "loading"
      //state.status = "loading"
      state.userNavbarStatus = "loading"
    })
      .addCase(sendInvitationConfirmation.fulfilled, (state, action) => {
      //  console.log(state.currentUser)
     // state.currentUser = action.payload
     // state.profileStatus = "succeeded"
      //state.status = "succeeded"
      state.userNavbarStatus = "succeeded"
    })
    .addCase(sendInvitationConfirmation.rejected, (state, action) => {
      //state.profileStatus = "failed"
      //state.status = "failed"
      state.userNavbarStatus = "failed"
    })
    .addCase(getCurrentUserFriendlist.pending, (state, action) => {
      //state.profileStatus = "loading"
      state.profileStatusFromUser = "loading"
    })
      .addCase(getCurrentUserFriendlist.fulfilled, (state, action) => {
        state.friendList = action.payload
     // state.profileStatus = "succeeded"
       state.profileStatusFromUser = "succeeded"
    })
    .addCase(getCurrentUserFriendlist.rejected, (state, action) => {
      //state.profileStatus = "failed"
     state.profileStatusFromUser = "failed"
    })
    .addCase(getSelectedUserCommonFriends.pending, (state, action) => {
      //state.friendListStatus = "loading"
  })
  .addCase(getSelectedUserCommonFriends.fulfilled, (state, action) => {
    state.selectedUserCommonFriends = action.payload
    //state.friendListStatus = "succeeded"
   
  })
    .addCase(getSelectedUserCommonFriends.rejected, (state, action) => {
      //state.friendListStatus = "failed"
  })
    .addCase(updateInvitationStatus.pending, (state, action) => {
      //state.profileStatus = "loading"
      //state.status = "loading"
    })
      .addCase(updateInvitationStatus.fulfilled, (state, action) => {
        state.friendList = action.payload
     // state.profileStatus = "succeeded"
      //  state.status = "succeeded"
    })
    .addCase(updateInvitationStatus.rejected, (state, action) => {
      //state.profileStatus = "failed"
     // state.status = "failed"
    })
    .addCase(removeSomeoneFromFriendlist.pending, (state, action) => {
      //state.profileStatus = "loading"
      //state.status = "loading"
      state.friendListStatus = "loading"
    })
      .addCase(removeSomeoneFromFriendlist.fulfilled, (state, action) => {
      //  console.log(state.currentUser)
     // state.currentUser = action.payload
     // state.profileStatus = "succeeded"
      //state.status = "succeeded"
        state.friendList = action.payload
 
      state.friendListStatus = "succeeded"
    })
    .addCase(removeSomeoneFromFriendlist.rejected, (state, action) => {
      //state.profileStatus = "failed"
      //state.status = "failed"
      state.friendListStatus = "failed"
    })

    // FRIENDLIST REDUX 
      .addCase(addUserToCustomFriendist.pending, (state, action) => {
        state.invitationsStatus = "loading"
    })
      .addCase(addUserToCustomFriendist.fulfilled, (state, action) => {
        const invits = state.invitationsList 
        state.invitationsList = [...invits, action.payload]
        state.invitationsStatus = "succeeded"
    })
    .addCase(addUserToCustomFriendist.rejected, (state, action) => {
      state.invitationsStatus = "failed"
    })
      // GET CURRENTUSER INVITATIONS LIST
    .addCase(getCurrentUserInvitationsList.pending, (state, action) => {
  })
    .addCase(getCurrentUserInvitationsList.fulfilled, (state, action) => {
      state.currentInvitationsList = action.payload
  })
  .addCase(getCurrentUserInvitationsList.rejected, (state, action) => {
  })
  // REFUSE INVITATION
      .addCase(refuseInvitation.pending, (state, action) => {
        state.userNavbarStatus = "loading"
  })
  .addCase(refuseInvitation.fulfilled, (state, action) => {
    state.userNavbarStatus = "succeeded"
  })
  .addCase(refuseInvitation.rejected, (state, action) => {
    state.userNavbarStatus = "failed"
  })
  // MARK INVITATION AS SEEN
  .addCase(markInvitationAsSeen.pending, (state, action) => {
    state.userNavbarStatus = "loading"
  })
  .addCase(markInvitationAsSeen.fulfilled, (state, action) => {
    state.userNavbarStatus = "succeeded"
  })
    .addCase(markInvitationAsSeen.rejected, (state, action) => {
    state.userNavbarStatus = "failed"
    })
    // UPDATE LAST SEEN USER
    .addCase(updateCurrentUserLastSeen.pending, (state, action) => {
    })
    .addCase(updateCurrentUserLastSeen.fulfilled, (state, action) => {
    })
    .addCase(updateCurrentUserLastSeen.rejected, (state, action) => {
    })
    // GET ALL USERNAMES
      .addCase(getAllUsernames.pending, (state, action) => {
        state.usernamesStatus = "loading"
    })
    .addCase(getAllUsernames.fulfilled, (state, action) => {
      state.usernamesList = action.payload
      if (action.payload.length > 0) {
        state.usernamesStatus = "succeeded"
      }
    })
    .addCase(getAllUsernames.rejected, (state, action) => {
    })
     // GET CURRENT USER COMMON FRIENDS
    .addCase(getCurrentUserCommonFriends.pending, (state, action) => {
    })
    .addCase(getCurrentUserCommonFriends.fulfilled, (state, action) => {
      state.commonFriendships = action.payload
     
    })
    .addCase(getCurrentUserCommonFriends.rejected, (state, action) => {
    })
    //getCurrentUserSuggestions
    .addCase(getCurrentUserSuggestions.pending, (state, action) => {
    })
    .addCase(getCurrentUserSuggestions.fulfilled, (state, action) => {
      state.suggestions = action.payload
     
    })
    .addCase(getCurrentUserSuggestions.rejected, (state, action) => {
    })

  }
})

export const getUsersStatus = (state) => state.users.status
export const selectAllUsers = (state) => state.users.users
export const getCurrentInvitation = (state) => state.users.currentInvitation
export const getCurrentStatus = (state) => state.users.profileStatus
//export const getCurrentUser = (state) => state.users.currentUser
export const selectCurrentUser = (state) => state.users.currentUser
export const selectFriendList = (state) => state.users.friendList
export const getFriendListStatus = (state) => state.users.friendListStatus
export const selectSelectedFriendList = (state) => state.users.selectedFriendList
export const selectInvitationsList = (state) => state.users.invitationsList
export const getinvitationsStatus = (state) => state.users.invitationsStatus
export const getUserImageUploadStatus = (state) => state.users.imageUploadStatus
export const getUserProfileStatusFromUser = (state) => state.users.profileStatusFromUser
export const selectCurrentUserInvitationsList = (state) => state.users.currentInvitationsList
export const getCurrentUserNavbarStatus = (state) => state.users.userNavbarStatus
export const selectUsernamesStatus = (state) => state.usernamesStatus

export const selectCurrentUserCommonFriends = (state) => state.users.commonFriendships
export const selectCurrentUserSuggestions = (state) => state.users.suggestions

export const selectAllUsernamesList = (state) => state.users.usernamesList

export const selectSelectedUserCommonFriends = (state) => state.users.selectedUserCommonFriends


export default usersSlice.reducer
