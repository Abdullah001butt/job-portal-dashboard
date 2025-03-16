import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filters: {
    jobType: '',
    location: '',
  },
  searchTerm: '',
};

export const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { setFilters, setSearchTerm } = jobsSlice.actions;
export default jobsSlice.reducer;
