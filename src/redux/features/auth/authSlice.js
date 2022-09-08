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

    token = await response.headers
      .get("authorization")
      .split("")
      .splice(7)
      .join("");
    Cookies.set("auth-token", token);
    Cookies.set("isAuth", true);
  } catch (err) {
    console.error(err);
  }

  if (response.status === 200) {
    const response2 = await fetch(`${BASE_URL}/api/v1/users`);
    const datatest2 = await response2.json();
    const test3 = datatest2.filter((i) => i.email === payload.email);
    let currentUser = {
      name: test3[0].username,
      id: test3[0].id,
    };
    Cookies.set("user", JSON.stringify(currentUser));
  }

  return response.status;
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

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(register.fulfilled, (state, action) => {})
      .addCase(logout.fulfilled, (state, action) => {
        state.userAuth = false;
        //state.isAuth = false
      })
      .addCase(login.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload === 200) {
          state.userAuth = true;
        } else if (action.payload === 401) {
          state.error = "wrong password";
          state.nextAction = "get user";
        } else if (action.payload === 400) {
          state.error = "wrong account";
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

export const getUserStatusAfterFailedLogin = (state) =>
  state.auth.fetchedUserByEmailStatus;

export default authSlice.reducer;
