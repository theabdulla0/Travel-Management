import { Route, Routes } from "react-router-dom";
import Home from "./pages/user/Home";
import CreateTrip from "./pages/trips/CreateTrip";
import { Toaster } from "./components/ui/sonner";
import PasswordPassword from "./pages/auth/PasswordForgot";
import { React } from "react";
import Profile from "./pages/user/Profile";
import ViewUserAllTrips from "./pages/trips/ViewUserAllTrips";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./components/common/ProtectedRoute";

function App() {
  return (
    <div>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<Home />} />
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
        <Route path="/forgot-password" element={<PasswordPassword />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;
