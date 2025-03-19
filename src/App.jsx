import React, { Suspense } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { store } from "./redux/store";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";
import SavedJobs from "./pages/SavedJobs";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 10,
      cacheTime: 1000 * 60 * 30,
    },
  },
});

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <div className="w-12 h-12 border-4 border-primary/50 border-t-transparent rounded-full animate-spin absolute top-2 left-2"></div>
      </div>
      <p className="text-lg font-medium text-muted-foreground animate-pulse">
        Loading amazing jobs for you...
      </p>
    </div>
  </div>
);

const AppContent = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="min-h-screen w-full bg-gray-50">
      {!isLoginPage && <Header />}
      <main className="container mx-auto px-4 py-8">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Jobs />
                </ProtectedRoute>
              }
            />
            <Route
              path="/job/:id"
              element={
                <ProtectedRoute>
                  <JobDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/favorites"
              element={
                <ProtectedRoute>
                  <Favorites />
                </ProtectedRoute>
              }
            />
            <Route
              path="/saved-jobs"
              element={
                <ProtectedRoute>
                  <SavedJobs />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </main>
      <ScrollToTop />
    </div>
  );
};

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster />
        <AppContent />
      </BrowserRouter>
    </QueryClientProvider>
  </Provider>
);

export default App;
