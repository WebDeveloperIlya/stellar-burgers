// src/slices/userSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser, TRegisterData, TLoginData } from '../utils/types';
import { getUserApi, updateUserApi, loginUserApi, registerUserApi } from '../utils/burger-api';

type UserState = {
  data: TUser | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: UserState = {
  data: null,
  status: 'idle',
  error: null,
};

export const fetchCurrentUser = createAsyncThunk('user/fetchCurrentUser', async () => {
  const response = await getUserApi();
  return response.user;
});

export const updateUserProfile = createAsyncThunk('user/updateUserProfile', async (user: Partial<TRegisterData>) => {
  const response = await updateUserApi(user);
  return response.user;
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch user data';
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to update user profile';
      });
  },
});

export default userSlice.reducer;
