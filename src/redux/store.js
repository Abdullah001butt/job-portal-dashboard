import { configureStore } from "@reduxjs/toolkit";
import jobsReducer from "./slices/jobsSlice";
import authReducer from "./slices/authSlice";
import favoritesReducer from "./slices/favoritesSlice";
import savedJobsReducer from "./slices/savedJobsSlice";

export const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    auth: authReducer,
    favorites: favoritesReducer,
    savedJobs: savedJobsReducer,
  },
});
