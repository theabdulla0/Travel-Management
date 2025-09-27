import { Route, Routes } from "react-router-dom";
import Home from "./pages/user/Home";
import CreateTrip from "./pages/trips/CreateTrip";
import { Toaster } from "./components/ui/sonner";
import PasswordPassword from "./pages/auth/PasswordForgot";
import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "./features/auth/authThunk";
import Profile from "./pages/user/Profile";
function App() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-trip" element={<CreateTrip />} />
        <Route path="/forgot-password" element={<PasswordPassword />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;
