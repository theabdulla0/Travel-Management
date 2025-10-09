import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import LayoutCommon from "@/components/common/LayoutCommon";
import { toast } from "sonner";
import { login } from "@/features/auth/authThunk";
import { useDispatch } from "react-redux";
import { setUserData } from "@/features/auth/authSlicer";

function Login() {
  const [email, setEmail] = useState("spawn@gmail.com");
  const [password, setPassword] = useState("Hello@123");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    try {
      const res = await dispatch(login({ email, password })).unwrap();
      if (!res?.success) {
        toast.error(res?.message || "Login failed");
        return;
      }

      const { loggedInUser } = res.data || {};
      dispatch(
        setUserData({
          user: loggedInUser,
        })
      );

      navigate("/");
      toast.success("Logged in successfully!");
    } catch (err) {
      const msg =
        err?.message || err?.data?.message || "Login failed. Please try again.";
      toast.error(msg);
    }
  };

  return (
    <LayoutCommon>
      <div className="mx-auto mt-10 px-4">
        <Card className="w-full max-w-sm mx-auto">
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to log in to your account
            </CardDescription>

            <div className="mt-2">
              <Link
                to="/register"
                className="text-sm text-primary hover:underline"
              >
                Don&apos;t have an account? Sign up
              </Link>
            </div>
          </CardHeader>

          <form onSubmit={handleLogin} noValidate>
            <CardContent>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    placeholder="m@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                    // disabled={loading}
                    aria-invalid={!!error}
                  />
                </div>

                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    autoComplete="current-password"
                    required
                    // disabled={loading}
                    aria-invalid={!!error}
                  />
                </div>

                {error ? (
                  <p className="text-sm text-red-500" role="alert">
                    {error}
                  </p>
                ) : null}
              </div>
            </CardContent>

            <CardFooter className="flex-col mt-5 gap-2">
              <Button type="submit" className="w-full">
                Sign In with Email
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </LayoutCommon>
  );
}

export default Login;
