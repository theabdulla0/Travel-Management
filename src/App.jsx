import { Route, Routes } from "react-router-dom";
import Home from "./pages/user/Home";
import CreateTrip from "./pages/trips/CreateTrip";
import Profile from "./pages/user/Profile";
import ViewUserAllTrips from "./pages/trips/ViewUserAllTrips";
import ForgotPassword from "./pages/auth/PasswordForgot";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFoundPage from "./pages/NotFoundPage";
import { Toaster } from "./components/ui/sonner";
import { React } from "react";
import useGetCurrentUser from "./hooks/useGetCurrentUser";
import ProtectedRoute from "./components/common/ProtectedRoute"; // 👈 create this

function App() {
  useGetCurrentUser(); // auto-fetch current user if token exists

  return (
    <div>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<NotFoundPage />} />

        {/* 🔒 Private */}
        <Route
          path="/create-trip"
          element={
            <ProtectedRoute>
              <CreateTrip />
            </ProtectedRoute>
          }
        />
        <Route
          path="/trips"
          element={
            <ProtectedRoute>
              <ViewUserAllTrips />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* Global toaster for notifications */}
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;
