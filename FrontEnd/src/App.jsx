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
import { useEffect, useRef, useState } from "react";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { useSelector } from "react-redux";
import useGetCurrentUser from "./hooks/useGetCurrentUser";
import PageLoading from "./components/PageLoading";

function App() {
  const [loading, setLoading] = useState(true);
  const { isFetched } = useSelector((state) => state.auth);

  const MIN_LOADING_MS = 2000;
  const startTime = useRef(Date.now());
  const timeoutRef = useRef(null);

  useEffect(() => {
    const finish = () => {
      const elapsed = Date.now() - startTime.current;
      const wait = Math.max(MIN_LOADING_MS - elapsed, 0);
      timeoutRef.current = setTimeout(() => setLoading(false), wait);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish);
    }

    return () => {
      window.removeEventListener("load", finish);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useGetCurrentUser();

  const showLoader = loading || !isFetched;
  if (showLoader) {
    return <PageLoading loading={true} text="Please wait..." />;
  }

  return (
    <div>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<NotFoundPage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private */}
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

      {/* Global toaster */}
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;
