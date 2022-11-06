import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
const BASE_URL = process.env.REACT_APP_PROD_BACK_DOMAIN;

const initialState = {
  randomNumber: 3,
  userAuth: Cookies.get("isAuth") || false,
  isAuth: false,
  status: "idle",
  error: null,
  nextAction: "",
  userByEmail: "",
  fetchedUserByEmailStatus: "idle",
  lastUserFound: '',
  loader: false

};

export const register = createAsyncThunk("auth/register", async (payload) => {
  const data = {
    user: {
      username: payload.username,
      email: payload.email,
      password: payload.password,
    },
  };
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch(`${BASE_URL}/users`, config);
  } catch (e) {
    console.log(e);
  }
});

export const login = createAsyncThunk("auth/login", async (payload) => {
  const data = {
    user: {
      email: payload.email,
      password: payload.password,
    },
  };
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  let response = [];
  let token = [];
  try {
    response = await fetch(`${BASE_URL}/users/sign_in`, config);
    let test = await response.headers.get("authorization")



    token = await response.headers
      .get("authorization")
      .split("")
      .splice(7)
      .join("");
    Cookies.set("auth-token", token);
    Cookies.set("isAuth", true);


  } catch (err) {
    console.log(err);
  }
  console.log("CHECKING ERRORS MESSAGES AFTER LOGIN ")
  console.log("CHECKING ERRORS MESSAGES AFTER LOGIN ")
  console.log(response.status)
  console.log("CHECKING ERRORS MESSAGES AFTER LOGIN ")
  console.log("CHECKING ERRORS MESSAGES AFTER LOGIN ")

  // status = 401 if correct account but incorrect password
  // status = 400 if uncorrect account + uncorrect password
  // status = 200 if correct account + correct password

  // déjà ca plante quand il y a une fausse addresse email
  // ensuite c'est un mess total, pk ya un current user if status 200

  // bon jvai faire un nvelle requete dans le back. pcq apparment j'ai besoin de mettre
  // un cookie et le current user, pour apres le login.

  // mais cela ne concerne que si la requete est 200 donc correct account + correct password.

  if (response.status === 200) {
    const response2 = await fetch(`${BASE_URL}/api/v1/getUserByEmail/${payload.email}`);
    const dataUser= await response2.json();
    let currentUser = {
      name: dataUser.username,
      id: dataUser.id,
    };
    Cookies.set("user", JSON.stringify(currentUser));
  }

  return { status: response.status, token: token };
});

export const logout = createAsyncThunk("auth/logout", async (payload) => {
  Cookies.get("auth-token");
  const config = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${Cookies.get("auth-token")}`,
    },
  };
  const response = await fetch(`${BASE_URL}/users/sign_out`, config);
  if (response.status === 200) {
    Cookies.remove("auth-token");
    Cookies.remove("isAuth");
    Cookies.remove("user");
  }
});

export const getUserByEmail = createAsyncThunk(
  "auth/getUserByEmail",
  async (payload) => {
    let email = Cookies.get("email");
    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    let response = [];
    let data = [];
    try {
      response = await fetch(
        `${BASE_URL}/api/v1/getUserByEmail/${email}`,
        config
      );
      data = await response.json();
    } catch (e) {
      console.log(e);
    }
    return data;
  }
);

export const getUserByEmail2 = createAsyncThunk(
  "auth/getUserByEmail2",
  async (payload) => {
    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    let response = [];
    let data = [];
    try {
      response = await fetch(
        `${BASE_URL}/api/v1/getUserByEmail/${payload}`,
        config
      );
      data = await response.json();
    } catch (e) {
      console.log(e);
    }
    return data;
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (payload) => {
    const data = {
      user: {
        email: payload,
      },
    };
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    let response = [];
    let data2 = [];
    try {
      response = await fetch(`${BASE_URL}/users/password`, config);
      data2 = await response.json();
    } catch (e) {
      console.log(e);
    }
    return data2;
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (payload) => {
    const data = {
      user: {
        reset_password_token: payload.TOKEN,
        password: payload.password,
        password_confirmation: payload.passwordConfirmation,
      },
    };
    const config = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    let response = [];
    let data2 = [];
    try {
      response = await fetch(`${BASE_URL}/users/password`, config);
      data2 = await response.json();
    } catch (e) {
      console.log(e);
    }

    return data2;
  }
);

export const cancelSearchedAccount = createAsyncThunk(
  "auth/cancelSearchedAccount",
  async (payload) => {}
);


export const resetNextAction = createAsyncThunk(
  "auth/resetNextAction",
  async (payload) => {
    console.log('HI?')
    return true
  }
);

export const resetUserFound = createAsyncThunk(
  "auth/resetUserFound",
  async (payload) => {
    console.log('HI?')
    return true
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder

      
      .addCase(logout.fulfilled, (state, action) => {
        state.userAuth = false;
        //state.isAuth = false
        
      })

      .addCase(resetNextAction.fulfilled, (state, action) => {

        state.nextAction = "";
      })
      .addCase(resetUserFound.fulfilled, (state, action) => {
        state.lastUserFound = state.userByEmail
        state.userByEmail = "";
      })

      .addCase(login.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          console.log("MMMMMMMMMMMMMMMMMMMMMMMMMM")
          console.log("MMMMMMMMMMMMMMMMMMMMMMMMMM")
          console.log("inside REDUX login payload")
          console.log("LA REQUETE LOGIN DANS LE BACKEND EST HYPER LONGUE SI ELLE EST REUSSIE")
          console.log("MMMMMMMMMMMMMMMMMMMMMMMMMM")
          console.log("MMMMMMMMMMMMMMMMMMMMMMMMMM")
          state.userAuth = true;
          state.nextAction = "succeeded auth";
          state.loader = true
        } else if (action.payload.status === 401) {
          state.error = "wrong password";
          state.nextAction = "failed auth";
        } else if (action.payload.status === 400) {
          state.error = "wrong account";
          state.nextAction = "failed auth";
        }
        //state.userAuth = true
        state.status = "succeeded";
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(getUserByEmail.pending, (state, action) => {
        state.fetchedUserByEmailStatus = "loading";
      })
      .addCase(getUserByEmail.fulfilled, (state, action) => {
        state.userByEmail = action.payload;
        state.fetchedUserByEmailStatus = "succeeded";
      })
      .addCase(getUserByEmail.rejected, (state, action) => {
        state.fetchedUserByEmailStatus = "failed";
      })
      .addCase(getUserByEmail2.pending, (state, action) => {
        state.fetchedUserByEmailStatus = "loading";
      })
      .addCase(getUserByEmail2.fulfilled, (state, action) => {
        state.userByEmail = action.payload;
        state.fetchedUserByEmailStatus = "succeeded";
        if (action.payload.status !== 404 && action.payload.status !== 500) {
          state.userByEmail = action.payload;
        } else {
          state.userByEmail = "error";
        }
      })
      .addCase(getUserByEmail2.rejected, (state, action) => {
        state.fetchedUserByEmailStatus = "failed";
      })
      .addCase(resetPassword.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.userByEmail = action.payload;
        state.status = "succeeded";
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(cancelSearchedAccount.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(cancelSearchedAccount.fulfilled, (state, action) => {
        state.userByEmail = "";
        state.status = "succeeded";
      })
      .addCase(cancelSearchedAccount.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});
export const getUserStatus = (state) => state.auth.status;
export const testRandomNumber = (state) => state.auth.randomNumber;
export const userAuthenticated = (state) => state.auth.userAuth;
export const checkingUserAuthentication = (state) => state.auth;

export const getUserErrorStatus = (state) => state.auth.error;

export const getAuthNextAction = (state) => state.auth.nextAction;

export const selectUserByEmail = (state) => state.auth.userByEmail;

export const selectLastUserFound = (state) => state.auth.lastUserFound

export const selectAuthLoader = (state) => state.auth.loader

export const getUserStatusAfterFailedLogin = (state) =>
  state.auth.fetchedUserByEmailStatus;

export default authSlice.reducer;
