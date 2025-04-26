
import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

// Define types for our context
interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name?: string) => Promise<boolean>;
  logout: () => void;
  requestPasswordReset: (email: string) => Promise<boolean>;
  resetPassword: (token: string, newPassword: string) => Promise<boolean>;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Check if the user is already logged in (from localStorage)
  useEffect(() => {
    const storedToken = localStorage.getItem("auth_token");
    const storedUser = localStorage.getItem("auth_user");
    
    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user", error);
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_user");
      }
    }
    
    setIsLoading(false);
  }, []);

  // For real applications, these functions would make API calls
  // For this demo, we'll simulate the authentication flow
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // This is where you would make a real API call to your backend
      // In this demo, we'll accept any non-empty credentials
      if (!email || !password) {
        throw new Error("Email and password are required");
      }
      
      // Create a mock user and token
      const mockUser = {
        id: "user_" + Math.random().toString(36).substring(2, 9),
        email,
        name: email.split('@')[0]
      };
      
      const mockToken = `mock_token_${Math.random().toString(36).substring(2)}`;
      
      // Store in localStorage
      localStorage.setItem("auth_token", mockToken);
      localStorage.setItem("auth_user", JSON.stringify(mockUser));
      
      // Update state
      setUser(mockUser);
      setToken(mockToken);
      
      // Show success message
      toast({
        title: "Login successful",
        description: `Welcome back, ${mockUser.name || mockUser.email}!`,
      });
      
      return true;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name?: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Validate inputs
      if (!email || !password) {
        throw new Error("Email and password are required");
      }
      
      // Here you would make a real API call to register the user
      
      // For demo purposes, create a mock user
      const mockUser = {
        id: "user_" + Math.random().toString(36).substring(2, 9),
        email,
        name: name || email.split('@')[0]
      };
      
      const mockToken = `mock_token_${Math.random().toString(36).substring(2)}`;
      
      // Store in localStorage
      localStorage.setItem("auth_token", mockToken);
      localStorage.setItem("auth_user", JSON.stringify(mockUser));
      
      // Update state
      setUser(mockUser);
      setToken(mockToken);
      
      // Show success message
      toast({
        title: "Registration successful",
        description: "Your account has been created and you're now logged in.",
      });
      
      return true;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // Clear localStorage
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    
    // Update state
    setUser(null);
    setToken(null);
    
    // Show confirmation
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const requestPasswordReset = async (email: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!email) {
        throw new Error("Email is required");
      }
      
      // In a real app, this would send an email with a reset link
      
      // Show success message
      toast({
        title: "Password reset email sent",
        description: `If an account exists for ${email}, you'll receive a password reset link.`,
      });
      
      return true;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Password reset request failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (token: string, newPassword: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!token || !newPassword) {
        throw new Error("Invalid token or password");
      }
      
      // In a real app, you'd validate the token and update the password
      
      // Show success message
      toast({
        title: "Password reset successful",
        description: "Your password has been updated. Please log in with your new password.",
      });
      
      return true;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Password reset failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    token,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    requestPasswordReset,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Create a custom hook for using the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
