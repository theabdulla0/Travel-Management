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
import { useDispatch } from "react-redux";
import { signup } from "@/features/auth/authThunk"; // import your thunk
import { setUserData } from "@/features/auth/authSlicer";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await dispatch(signup({ name, email, password })).unwrap();
      if (!res?.success) {
        toast.error(res?.message || "Register failed");
        return;
      }

      navigate("/login");
      toast.success("Register in successfully!");
    } catch (err) {
      const msg =
        err?.message ||
        err?.data?.message ||
        "Register failed. Please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LayoutCommon>
      <div className="mx-auto mt-10 px-4">
        <Card className="w-full max-w-sm mx-auto">
          <CardHeader>
            <CardTitle>Create your account</CardTitle>
            <CardDescription>Enter your details to sign up</CardDescription>

            <div className="mt-2">
              <Link
                to="/login"
                className="text-sm text-primary hover:underline"
              >
                Already have an account? Sign in
              </Link>
            </div>
          </CardHeader>

          <form onSubmit={handleRegister} noValidate>
            <CardContent>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={name}
                    placeholder="Jane Doe"
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    required
                    disabled={loading}
                    aria-invalid={!!error}
                  />
                </div>

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
                    disabled={loading}
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
                    autoComplete="new-password"
                    required
                    disabled={loading}
                    aria-invalid={!!error}
                    minLength={6}
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-500" role="alert">
                    {error}
                  </p>
                )}
              </div>
            </CardContent>

            <CardFooter className="flex-col mt-5 gap-2">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating account..." : "Create account"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </LayoutCommon>
  );
}

export default Register;
