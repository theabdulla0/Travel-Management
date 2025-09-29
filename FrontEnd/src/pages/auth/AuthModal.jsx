import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { login, signup } from "../../features/auth/authThunk";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { setUserData } from "@/features/auth/authSlicer";

function AuthModal({ open, setOpen }) {
  const [tab, setTab] = useState("login");
  const [email, setEmail] = useState("spawn@gmail.com ");
  const [password, setPassword] = useState("Hello@123");
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  // --- Handlers ---
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }
    try {
      await dispatch(login({ email, password })).unwrap();
      dispatch(setUserData(res.data));
      toast.success("Logged in successfully!");
      setOpen(false);
    } catch (err) {
      toast.error(err);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("Please fill all fields.");
      return;
    }
    try {
      const res = await dispatch(signup({ name, email, password })).unwrap();
      dispatch(setUserData(res.data));
      toast.success("Account created!");
      setOpen(false);
    } catch {
      toast.error("Account creation failed.");
      toast.error(err);
    }
  };

  const googleLogin = () => {
    toast.info("Google login clicked");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md w-full p-6 rounded-lg shadow-lg">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-semibold">
            {tab === "login" ? "Sign In" : "Register"}
          </DialogTitle>
          <DialogDescription className="text-gray-500 mt-1">
            {tab === "login"
              ? "Access your account to manage trips."
              : "Create an account to start managing trips."}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="grid w-full grid-cols-2 mt-4">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          {/* --- LOGIN TAB --- */}
          <TabsContent value="login" className="mt-6">
            <Button
              type="button"
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
              onClick={googleLogin}
            >
              <FcGoogle size={24} /> Sign In with Google
            </Button>

            <div className="my-6 text-center text-gray-400 relative">
              <span className="px-3">OR</span>
              <div className="absolute top-1/2 left-0 w-full border-t z-0"></div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing in..." : "Sign In with Email"}
              </Button>
            </form>

            <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
              <Link
                to="/forgot-password"
                onClick={() => setOpen(false)}
                className="text-blue-500 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </TabsContent>

          {/* --- REGISTER TAB --- */}
          <TabsContent value="register" className="mt-6">
            <Button
              type="button"
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
              onClick={googleLogin}
            >
              <FcGoogle size={24} /> Register with Google
            </Button>

            <div className="my-6 text-center text-gray-400 relative">
              <span className=" px-3">OR</span>
              <div className="absolute top-1/2 left-0 w-full border-t  z-0"></div>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <Input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Registering..." : "Register"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

export default AuthModal;
