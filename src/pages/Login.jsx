import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "@/redux/slices/authSlice";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { BriefcaseIcon, Mail, Lock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const userData = {
      id: 1,
      email: data.email,
      name: data.email.split('@')[0],
    };
    dispatch(login(userData));
    navigate('/');
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5 p-4">
      <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:radial-gradient(white,transparent_85%)]" />
      
      <Card className="w-full max-w-lg shadow-2xl relative overflow-hidden backdrop-blur-sm bg-background/95 border-primary/20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
        
        <CardHeader className="space-y-8 text-center relative">
          <div className="flex justify-center">
            <div className="rounded-full bg-primary p-4 shadow-xl shadow-primary/20">
              <BriefcaseIcon className="h-12 w-12 text-background animate-pulse" />
            </div>
          </div>
          <div className="space-y-2">
            <CardTitle className="text-4xl font-bold tracking-tight bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-base text-muted-foreground">
              Enter your credentials to access your account
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="relative">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="name@example.com"
                    className="h-12 text-lg pl-10 transition-colors focus:border-primary"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                </div>
                {errors.email && (
                  <span className="text-sm text-destructive block">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="h-12 text-lg pl-10 transition-colors focus:border-primary"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                </div>
                {errors.password && (
                  <span className="text-sm text-destructive block">
                    {errors.password.message}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <Button 
                type="submit" 
                className="w-full h-12 text-lg font-semibold transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Sign In
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <a href="#" className="text-primary hover:underline font-medium">
                  Sign up
                </a>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
