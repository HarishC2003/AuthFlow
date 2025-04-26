
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthLogo from "@/components/AuthLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Mail } from "lucide-react";

// Define the form schema
const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword: React.FC = () => {
  const { requestPasswordReset } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setIsSubmitting(true);
    const success = await requestPasswordReset(data.email);
    setIsSubmitting(false);
    
    if (success) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <AuthLogo />
          <h1 className="auth-title">Forgot password?</h1>
          <p className="auth-subtitle">
            Enter your email and we'll send you a link to reset your password
          </p>
        </div>

        {isSubmitted ? (
          <div className="text-center space-y-4">
            <div className="bg-green-50 text-green-800 p-4 rounded-lg">
              <p className="font-medium mb-1">Check your email</p>
              <p className="text-sm">
                If an account exists with the email you provided, we've sent password reset instructions.
              </p>
            </div>
            <div className="pt-2">
              <Link
                to="/login"
                className="text-brand-600 hover:text-brand-800 font-medium text-sm"
              >
                Return to login
              </Link>
            </div>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input 
                          placeholder="you@example.com" 
                          className="pl-10" 
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full bg-brand-600 hover:bg-brand-700" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send reset link"}
              </Button>
            </form>
          </Form>
        )}

        <div className="mt-6 text-center text-sm">
          <span className="text-gray-500">Remember your password?</span>{" "}
          <Link to="/login" className="text-brand-600 hover:text-brand-800 font-medium">
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
