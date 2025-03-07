
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/components/common/Logo";
import { useToast } from "@/hooks/use-toast";

const Signup: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!name || !email || !password) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields",
      });
      return;
    }

    // Mock signup - in a real app, you would register with an API
    localStorage.setItem("isLoggedIn", "true");
    toast({
      title: "Welcome to घरधैलो!",
      description: "Your account has been created successfully",
    });
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex flex-col bg-ghar-gray dark:bg-gray-900 relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-ghar-red rounded-br-full opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-ghar-red rounded-tl-full opacity-20"></div>

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center items-center px-6">
        <div className="w-full max-w-md mx-auto glass p-8 rounded-xl">
          <div className="text-center mb-6">
            <Logo animated />
            <p className="mt-2 text-ghar-text-gray dark:text-gray-300">Create your account</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-white/50 dark:bg-white/10"
              />
            </div>

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
              Sign Up
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-ghar-text-gray dark:text-gray-400">
              Already have an account?{" "}
              <Button 
                variant="link" 
                className="p-0 text-ghar-red"
                onClick={() => navigate("/login")}
              >
                Log in
              </Button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
