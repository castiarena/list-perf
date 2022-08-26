import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchUsersApi } from "./testDataAPI";
import { initialState } from "./interfaces";

export const fetchUsers = createAsyncThunk("testData/fetchUsers", async () => {
  const response = await fetchUsersApi();
  return response;
});

export const testDataSlice = createSlice({
  name: "testData",
  initialState,
  reducers: {
    reset: (state) => {
      state.users = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "idle";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { reset } = testDataSlice.actions;

export const selectUsers = (state: RootState) => state.testData.users;
export const isLoading = (state: RootState) => state.testData.status;

export default testDataSlice.reducer;
