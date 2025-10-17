import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import authBg from "@/assets/auth-bg.jpg";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Password reset logic will be added with Lovable Cloud
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* Left Side - Image */}
      <div className="hidden md:block relative">
        <img 
          src={authBg} 
          alt="Fashion" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5" />
      </div>

      {/* Right Side - Form */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Link to="/" className="inline-block mb-8">
              <h1 className="text-4xl font-serif font-bold">OVAA Fashion</h1>
            </Link>
            <h2 className="text-3xl font-serif font-bold mb-2">Reset Password</h2>
            <p className="text-muted-foreground">
              {submitted 
                ? "Check your email for reset instructions" 
                : "Enter your email to reset your password"}
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" size="lg" className="w-full">
                Send Reset Link
              </Button>

              <Link to="/login">
                <Button type="button" variant="ghost" size="lg" className="w-full">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Login
                </Button>
              </Link>
            </form>
          ) : (
            <div className="space-y-6 text-center">
              <div className="bg-muted/30 p-6 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  We've sent password reset instructions to <strong>{email}</strong>. 
                  Please check your inbox and follow the link to reset your password.
                </p>
              </div>
              <Link to="/login">
                <Button variant="outline" size="lg" className="w-full">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Login
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
