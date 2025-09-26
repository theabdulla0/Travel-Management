import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/user/Home";
import CreateTrip from "./components/trips/CreateTrip";
import { Toaster } from "./components/ui/sonner";
import PasswordPassword from "./pages/auth/PasswordForgot";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-trip" element={<CreateTrip />} />
        <Route path="/forgot-password" element={<PasswordPassword />} />
      </Routes>
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;
