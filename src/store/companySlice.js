// File: src/store/companySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/adminApi';

// Fetch all companies (for users)
export const fetchCompanies = createAsyncThunk(
  'companies/fetchCompanies',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/companies');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Fetch single company details
export const fetchCompanyDetails = createAsyncThunk(
  'companies/fetchCompanyDetails',
  async (companyId, thunkAPI) => {
    try {
      const response = await api.get(`/companies/${companyId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Add a company (Admin)
export const addCompany = createAsyncThunk(
  'companies/addCompany',
  async (companyData, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;
      const response = await api.post('/companies', companyData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Update a company (Admin)
export const updateCompany = createAsyncThunk(
  'companies/updateCompany',
  async ({ id, companyData }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;
      const response = await api.put(`/companies/${id}`, companyData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Delete a company (Admin)
export const deleteCompany = createAsyncThunk(
  'companies/deleteCompany',
  async (id, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;
      await api.delete(`/companies/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const companySlice = createSlice({
  name: 'companies',
  initialState: {
    list: [],
    active: null,
    loading: false,
    error: null,
  },
  reducers: {
    setActiveCompany(state, action) {
      state.active = action.payload;
    },
    clearActiveCompany(state) {
      state.active = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all companies
      .addCase(fetchCompanies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch companies';
      })
      // Fetch company details
      .addCase(fetchCompanyDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCompanyDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.active = action.payload;
      })
      .addCase(fetchCompanyDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch details';
      })
      // Add company
      .addCase(addCompany.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })
      // Update company
      .addCase(updateCompany.fulfilled, (state, action) => {
        const index = state.list.findIndex(c => c.id === action.payload.id);
        if (index >= 0) state.list[index] = action.payload;
        if (state.active?.id === action.payload.id) state.active = action.payload;
      })
      // Delete company
      .addCase(deleteCompany.fulfilled, (state, action) => {
        state.list = state.list.filter(c => c.id !== action.payload);
        if (state.active?.id === action.payload) state.active = null;
      });
  },
});

export const { setActiveCompany, clearActiveCompany } = companySlice.actions;
export default companySlice.reducer;
