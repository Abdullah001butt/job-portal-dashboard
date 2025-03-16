import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favoriteJobs: JSON.parse(localStorage.getItem('favoriteJobs')) || [],
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const jobId = action.payload.id;
      const exists = state.favoriteJobs.some(job => job.id === jobId);
      
      if (exists) {
        state.favoriteJobs = state.favoriteJobs.filter(job => job.id !== jobId);
      } else {
        state.favoriteJobs.push(action.payload);
      }
      
      localStorage.setItem('favoriteJobs', JSON.stringify(state.favoriteJobs));
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
