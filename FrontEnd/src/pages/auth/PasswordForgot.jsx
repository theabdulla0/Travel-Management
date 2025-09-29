import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import LayoutCommon from "@/components/common/LayoutCommon";
import { useDispatch } from "react-redux";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import {
  verifyOtp,
  sendOtp,
  reset_password,
} from "../../features/auth/authThunk";
export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1 && !email) {
      toast.error("Please enter your email address.");
      return;
    }
    try {
      setLoading(true);
      if (step === 1) {
        await dispatch(sendOtp({ email }))
          .unwrap()
          .then((res) => {
            toast.success(res.message || "OTP send to mail!");
            setStep(2);
          });
      } else if (step === 2) {
        // verify OTP logic here
        if (!otp) {
          toast.error("Enter OTP first");
          return;
        }
        const res = await dispatch(verifyOtp({ email, otp }))
          .unwrap()
          .then((res) => res);
        toast.success(res.message || "OTP verified!");
        setStep(3);
      } else if (step === 3) {
        if (password !== confirmPassword) {
          toast.error("Passwords do not match.");
          return;
        }
        // reset password API call here
        await dispatch(
          reset_password({ email, oldPassword, password })
        ).unwrap();
        toast.success("Password reset successfully!");
        setStep(1); // reset flow back to start
        navigate("/");
      }
    } catch (err) {
      toast.error(err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const BackButton = ({ onClick }) => (
    <Button
      type="button"
      onClick={onClick}
      className="absolute cursor-pointer top-4 left-4 bg-transparent hover:bg-transparent text-gray-600 hover:text-gray-900"
    >
      <ArrowLeft size={20} />
    </Button>
  );

  return (
    <LayoutCommon>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        {step === 1 && (
          <Card className="relative w-full max-w-md shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-semibold">
                Forgot Password
              </CardTitle>
              <p className="text-gray-500 mt-1">
                Enter your email to reset your password
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Sending..." : "Send OTP"}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card className="relative w-full max-w-md shadow-lg">
            <BackButton onClick={() => setStep(1)} />
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-semibold">
                Verify OTP
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Label>OTP</Label>
                <Input
                  type="number"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Verifying..." : "Verify OTP"}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card className="relative w-full max-w-md shadow-lg">
            <BackButton onClick={() => setStep(2)} />
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-semibold">
                Reset Password
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="password"
                  placeholder="Old password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="New password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Resetting..." : "Reset Password"}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </LayoutCommon>
  );
}
