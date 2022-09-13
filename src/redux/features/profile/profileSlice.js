import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const BASE_URL = process.env.REACT_APP_PROD_BACK_DOMAIN;

const initialState = {
  profile: [],
  status: "idle", // differents value : 'iddle' | 'loading' |'succeeded' | 'failed'
  error: null,
  stateRefreshComp: "idle",
  redirectToErrorPage: false,
  navigationErrorsStatus:"idle"
};

export const getUserByUsername = createAsyncThunk(
  "users/getUserByUsername",
  async (payload) => {
    const config3 = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("auth-token")}`,
      },
    };
    let response3 = [];
    let data3 = [];
    try {
      response3 = await fetch(
        `${BASE_URL}/api/v1/profiles/${payload}`,
        config3
      );
      data3 = await response3.json();
    } catch (e) {
      console.log(e);
    }
    return data3;
  }
);

export const refreshComp = createAsyncThunk(
  "users/refreshComp",
  async (payload) => {}
);


export const resetPageErrorRedirection = createAsyncThunk(
  "users/resetPageErrorRedirection",
  async (payload) => {}
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(resetPageErrorRedirection.fulfilled, (state, action) => {
      state.redirectToErrorPage = false
    })
      .addCase(getUserByUsername.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getUserByUsername.fulfilled, (state, action) => {
        if (action.payload !== null) {
          state.profile = action.payload;
          state.status = "succeeded";
        } else {
          state.profile = 'error'
          state.status = "succeeded";
        }
      })
      .addCase(getUserByUsername.rejected, (state, action) => {
        state.status = "failed";
      })

      .addCase(refreshComp.pending, (state, action) => {
        state.stateRefreshComp = "loading";
      })
      .addCase(refreshComp.fulfilled, (state, action) => {
        state.stateRefreshComp = "succeeded";
      })
      .addCase(refreshComp.rejected, (state, action) => {
        state.stateRefreshComp = "failed";
      });
  },
});

export const getProfileStatus = (state) => state.profile.status;
export const selectProfileUser = (state) => state.profile.profile;

export const selectredirectToErrorPage = (state) => state.profile.redirectToErrorPage;

export const selectnavigationErrorsStatus = (state) => state.profile.navigationErrorsStatus;
export const selectRefreshCompStatus = (state) =>
  state.profile.stateRefreshComp;

export default profileSlice.reducer;
