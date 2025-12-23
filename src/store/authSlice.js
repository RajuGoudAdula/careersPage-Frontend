// File: src/store/authSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/adminApi'; // Axios instance for ADMIN APIs only

// =========================================
// ✅ ADMIN LOGIN THUNK
// =========================================
export const loginAdmin = createAsyncThunk(
  'auth/loginAdmin',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await api.logIn({ email, password });
      const { token, admin } = response.data;

      // Persist admin session
      localStorage.setItem('adminToken', token);
      localStorage.setItem('admin', JSON.stringify(admin));

      return { token, admin };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: 'Admin login failed' }
      );
    }
  }
);

// =========================================
// ✅ SLICE (Admin-only)
// =========================================
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('adminToken') || null,
    admin: localStorage.getItem('admin')
      ? JSON.parse(localStorage.getItem('admin'))
      : null,
    loading: false,
    error: null,
  },

  reducers: {
    logoutAdmin(state) {
      state.token = null;
      state.admin = null;
      state.error = null;

      // Remove from localStorage
      localStorage.removeItem('adminToken');
      localStorage.removeItem('admin');
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.admin = action.payload.admin;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Admin login failed';
      });
  },
});

export const { logoutAdmin } = authSlice.actions;
export default authSlice.reducer;
