
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { LogOut, User, Shield } from "lucide-react";
import EditProfileModal from "@/components/EditProfileModal";
import TwoFactorModal from "@/components/TwoFactorModal";
import ChangePasswordModal from "@/components/ChangePasswordModal";

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isTwoFactorOpen, setIsTwoFactorOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-2">Welcome to your secure dashboard</p>
        </div>
        
        <div className="bg-gradient-to-r from-brand-500 to-brand-700 rounded-xl text-white p-6 shadow-lg mb-8">
          <div className="flex items-center">
            <div className="bg-white/20 rounded-full p-3">
              <User className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-white/80 text-sm">Welcome back</p>
              <h2 className="text-xl font-semibold">{user?.name || user?.email}</h2>
            </div>
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Your profile details and settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium text-gray-500">Email</span>
                  <p>{user?.email}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Account ID</span>
                  <p>{user?.id}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setIsEditProfileOpen(true)}
              >
                Edit Profile
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>Manage your account security</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">Two-Factor Authentication</span>
                  <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">Not Enabled</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">Last Login</span>
                  <span className="text-xs">{new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setIsTwoFactorOpen(true)}
              >
                <Shield className="h-4 w-4 mr-2" />
                Two-Factor Authentication
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setIsChangePasswordOpen(true)}
              >
                Change Password
              </Button>
              <Button 
                variant="destructive" 
                className="w-full"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Log Out
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <EditProfileModal 
        isOpen={isEditProfileOpen} 
        onClose={() => setIsEditProfileOpen(false)} 
      />
      
      <TwoFactorModal 
        isOpen={isTwoFactorOpen} 
        onClose={() => setIsTwoFactorOpen(false)} 
      />
      
      <ChangePasswordModal 
        isOpen={isChangePasswordOpen} 
        onClose={() => setIsChangePasswordOpen(false)} 
      />
    </div>
  );
};

export default Dashboard;
