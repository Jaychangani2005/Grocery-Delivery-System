import { Button } from "@/components/ui/button";
import { authService } from "@/services/auth";
import { toast } from "react-hot-toast";

interface LoginButtonProps {
  onLogin: (userData: { id: number; name: string; email: string }) => void;
}

const LoginButton = ({ onLogin }: LoginButtonProps) => {
  const handleQuickLogin = async () => {
    try {
      // Use a test email and password
      const response = await authService.login("test@example.com", "password123");
      
      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("isLoggedIn", "true");
      
      // Call the onLogin callback with complete user data including id
      onLogin(response.user);

      toast.success("Logged in successfully!");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Failed to log in");
    }
  };

  return (
    <Button 
      onClick={handleQuickLogin}
      className="bg-green-600 hover:bg-green-700"
    >
      Quick Login (Test)
    </Button>
  );
};

export default LoginButton; 