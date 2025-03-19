import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  savedJobs: JSON.parse(localStorage.getItem('savedJobs')) || [],
};

export const savedJobsSlice = createSlice({
  name: 'savedJobs',
  initialState,
  reducers: {
    toggleSavedJob: (state, action) => {
      const jobId = action.payload.id;
      const exists = state.savedJobs.some(job => job.id === jobId);
      
      if (exists) {
        state.savedJobs = state.savedJobs.filter(job => job.id !== jobId);
      } else {
        state.savedJobs.push(action.payload);
      }
      
      localStorage.setItem('savedJobs', JSON.stringify(state.savedJobs));
    },
  },
});

export const { toggleSavedJob } = savedJobsSlice.actions;
export default savedJobsSlice.reducer;
