
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/components/common/Logo";
import AnimatedAvatar from "@/components/auth/AnimatedAvatar";
import { useToast } from "@/hooks/use-toast";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!email || !password) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter both email and password",
      });
      return;
    }

    // Mock login - in a real app, you would validate with an API
    localStorage.setItem("isLoggedIn", "true");
    toast({
      title: "Welcome back!",
      description: "You've successfully logged in",
    });
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex flex-col bg-ghar-gray dark:bg-gray-900 relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-ghar-red rounded-bl-full opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-ghar-red rounded-tr-full opacity-20"></div>

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center items-center px-6">
        <div className="w-full max-w-md mx-auto glass p-8 rounded-xl">
          <div className="text-center mb-6">
            <Logo animated />
            <p className="mt-2 text-ghar-text-gray dark:text-gray-300">Log in to your account</p>
          </div>

          <AnimatedAvatar
            isPasswordFocused={isPasswordFocused}
            isPasswordVisible={isPasswordVisible}
          />

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/50 dark:bg-white/10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(false)}
                  required
                  className="bg-white/50 dark:bg-white/10 pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-ghar-text-gray"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  {isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full bg-ghar-red hover:bg-ghar-red/90">
              Login
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-ghar-text-gray dark:text-gray-400">
              Don't have an account?{" "}
              <Button 
                variant="link" 
                className="p-0 text-ghar-red"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </Button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
