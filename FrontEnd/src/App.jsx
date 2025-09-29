import { Route, Routes } from "react-router-dom";
import Home from "./pages/user/Home";
import CreateTrip from "./pages/trips/CreateTrip";
import { Toaster } from "./components/ui/sonner";
import { React } from "react";
import Profile from "./pages/user/Profile";
import ViewUserAllTrips from "./pages/trips/ViewUserAllTrips";
import NotFoundPage from "./pages/NotFoundPage";
import useGetCurrentUser from "./hooks/useGetCurrentUser";
import { useSelector } from "react-redux";
import ForgotPassword from "./pages/auth/PasswordForgot";

function App() {
  useGetCurrentUser();
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/create-trip" element={<CreateTrip />} />
        <Route path="/trips" element={<ViewUserAllTrips />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;
