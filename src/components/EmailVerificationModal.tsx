
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Mail, Send } from "lucide-react";

interface EmailVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  email?: string;
}

const EmailVerificationModal: React.FC<EmailVerificationModalProps> = ({ 
  isOpen, 
  onClose, 
  email 
}) => {
  const { toast } = useToast();
  const [userEmail, setUserEmail] = useState(email || "");
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSendCode = async () => {
    if (!userEmail) {
      toast({
        variant: "destructive",
        title: "Email required",
        description: "Please enter your email address.",
      });
      return;
    }

    try {
      setIsLoading(true);
      // Simulate API call to send verification code
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsCodeSent(true);
      toast({
        title: "Verification code sent",
        description: `A 6-digit verification code has been sent to ${userEmail}`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to send code",
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (verificationCode.length !== 6) {
      toast({
        variant: "destructive",
        title: "Invalid code",
        description: "Please enter the complete 6-digit code.",
      });
      return;
    }

    try {
      setIsVerifying(true);
      // Simulate API call to verify code
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any 6-digit code
      toast({
        title: "Email verified successfully",
        description: "Your email has been verified.",
      });
      
      onClose();
      setIsCodeSent(false);
      setVerificationCode("");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Verification failed",
        description: "Invalid code. Please try again.",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendCode = async () => {
    setVerificationCode("");
    await handleSendCode();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Email Verification
          </DialogTitle>
          <DialogDescription>
            {!isCodeSent 
              ? "Enter your email address to receive a verification code."
              : "Enter the 6-digit verification code sent to your email."
            }
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {!isCodeSent ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="mt-2"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-blue-50 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  We've sent a verification code to
                </p>
                <p className="font-medium">{userEmail}</p>
              </div>
              
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
              
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Didn't receive the code?{" "}
                  <Button
                    variant="link"
                    className="p-0 h-auto text-sm"
                    onClick={handleResendCode}
                    disabled={isLoading}
                  >
                    Resend code
                  </Button>
                </p>
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          {!isCodeSent ? (
            <Button 
              onClick={handleSendCode} 
              disabled={!userEmail || isLoading}
            >
              <Send className="h-4 w-4 mr-2" />
              {isLoading ? "Sending..." : "Send Code"}
            </Button>
          ) : (
            <Button 
              onClick={handleVerifyCode} 
              disabled={verificationCode.length !== 6 || isVerifying}
            >
              {isVerifying ? "Verifying..." : "Verify Email"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EmailVerificationModal;
