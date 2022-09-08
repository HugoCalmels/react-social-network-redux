import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
const BASE_URL = process.env.REACT_APP_PROD_BACK_DOMAIN;

const initialState = {
  images: [],
  status: "idle", // differents value : 'iddle' | 'loading' |'succeeded' | 'failed'
  error: null,
};

export const getUserPostImages = createAsyncThunk(
  "auth/getUserPostImages",
  async (payload) => {
    const configNewPost = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("auth-token")}`,
      },
    };

    let response = [];
    let data = [];
    try {
      response = await fetch(
        `${BASE_URL}/api/v1/getAllPostImagesFromUser`,
        configNewPost
      );
      data = await response.json();
    } catch (e) {}

    return data;
  }
);

const imagesSlice = createSlice({
  name: "images",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder

      .addCase(getUserPostImages.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getUserPostImages.fulfilled, (state, action) => {
        state.images = action.payload;
        state.status = "succeeded";
      })
      .addCase(getUserPostImages.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});
export const getImagesStatus = (state) => state.images.status;
export const selectAllImages = (state) => state.images.images;

export default imagesSlice.reducer;
