
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useToast } from "@/components/ui/use-toast";
import { QrCode, Shield } from "lucide-react";

interface TwoFactorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TwoFactorModal: React.FC<TwoFactorModalProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const [isEnabled, setIsEnabled] = useState(false);
  const [showSetup, setShowSetup] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle2FA = (enabled: boolean) => {
    if (enabled && !isEnabled) {
      setShowSetup(true);
    } else if (!enabled && isEnabled) {
      handleDisable2FA();
    }
  };

  const handleEnable2FA = async () => {
    try {
      setIsLoading(true);
      // Simulate API call to verify code
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (verificationCode === "123456") {
        setIsEnabled(true);
        setShowSetup(false);
        toast({
          title: "Two-Factor Authentication enabled",
          description: "Your account is now protected with 2FA.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Invalid code",
          description: "Please enter the correct verification code.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Setup failed",
        description: "Failed to enable 2FA. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisable2FA = async () => {
    try {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsEnabled(false);
      toast({
        title: "Two-Factor Authentication disabled",
        description: "2FA has been disabled for your account.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Disable failed",
        description: "Failed to disable 2FA. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Two-Factor Authentication
          </DialogTitle>
          <DialogDescription>
            Add an extra layer of security to your account.
          </DialogDescription>
        </DialogHeader>
        
        {!showSetup ? (
          <div className="space-y-6 py-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="2fa-toggle" className="text-base font-medium">
                  Enable Two-Factor Authentication
                </Label>
                <p className="text-sm text-muted-foreground">
                  Use an authenticator app to generate verification codes
                </p>
              </div>
              <Switch
                id="2fa-toggle"
                checked={isEnabled}
                onCheckedChange={handleToggle2FA}
                disabled={isLoading}
              />
            </div>
            
            {isEnabled && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-green-800">
                  <Shield className="h-4 w-4" />
                  <span className="font-medium">2FA is enabled</span>
                </div>
                <p className="text-sm text-green-700 mt-1">
                  Your account is protected with two-factor authentication.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6 py-4">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <QrCode className="h-24 w-24 text-gray-500" />
                </div>
              </div>
              <div>
                <h3 className="font-medium">Scan QR Code</h3>
                <p className="text-sm text-muted-foreground">
                  Scan this QR code with your authenticator app, then enter the verification code below.
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="verification-code">Verification Code</Label>
                <div className="flex justify-center mt-2">
                  <InputOTP
                    maxLength={6}
                    value={verificationCode}
                    onChange={setVerificationCode}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          {showSetup && (
            <Button 
              onClick={handleEnable2FA} 
              disabled={verificationCode.length !== 6 || isLoading}
            >
              {isLoading ? "Verifying..." : "Enable 2FA"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TwoFactorModal;
