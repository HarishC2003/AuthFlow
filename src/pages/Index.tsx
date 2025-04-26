
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AuthLogo from "@/components/AuthLogo";

const Index: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b px-4 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-md bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-white"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <span className="ml-2 text-lg font-bold text-gray-900">AuthFlow</span>
          </div>
          
          <nav className="hidden md:flex space-x-4">
            <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-gray-900">How It Works</a>
          </nav>

          <div className="flex items-center space-x-2">
            {isAuthenticated ? (
              <Button asChild>
                <Link to="/dashboard" className="bg-brand-600 hover:bg-brand-700">
                  Dashboard
                </Link>
              </Button>
            ) : (
              <>
                <Button asChild variant="outline">
                  <Link to="/login">Log in</Link>
                </Button>
                <Button asChild className="bg-brand-600 hover:bg-brand-700">
                  <Link to="/register">Sign up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Secure Authentication Made Simple
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              AuthFlow provides a secure, fast, and easy-to-use authentication system for modern web applications.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-brand-600 hover:bg-brand-700">
                <Link to="/register">Get started</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/login">Log in</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Key Features</h2>
            <p className="text-gray-600 mt-2">Everything you need for secure authentication</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="h-12 w-12 rounded-lg bg-brand-100 text-brand-600 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Authentication</h3>
              <p className="text-gray-600">Industry-standard security with password hashing and JWT token verification.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="h-12 w-12 rounded-lg bg-brand-100 text-brand-600 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7v4a1 1 0 0 0 1 1h3" /><path d="M7 12h13a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1Z" /><path d="M13 12v3" /><path d="M10 20v-8" /><path d="M16 20v-8" /><path d="M22 12v4a1 1 0 0 1-1 1h-2" /><path d="M18 17h-5a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1Z" /></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Password Reset</h3>
              <p className="text-gray-600">Secure password reset flow with email verification for account recovery.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="h-12 w-12 rounded-lg bg-brand-100 text-brand-600 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.9 16.7a9 9 0 1 0-7.1 4.3" /><path d="M22 22 9 9" /></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Access Control</h3>
              <p className="text-gray-600">Protect routes and resources with role-based access control and permissions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="text-gray-600 mt-2">Simple, secure, and straightforward</p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-brand-600 text-white font-semibold flex items-center justify-center">
                  1
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-2">Create an account</h3>
                  <p className="text-gray-600">Sign up with your email and create a secure password to get started.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-brand-600 text-white font-semibold flex items-center justify-center">
                  2
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-2">Verify your identity</h3>
                  <p className="text-gray-600">Log in securely using your credentials whenever you need access.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-brand-600 text-white font-semibold flex items-center justify-center">
                  3
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-2">Access protected resources</h3>
                  <p className="text-gray-600">Once authenticated, enjoy secure access to your dashboard and protected content.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Button asChild size="lg" className="bg-brand-600 hover:bg-brand-700">
                <Link to="/register">Get started now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="h-8 w-8 rounded-md bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="text-white"
                >
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <span className="ml-2 text-lg font-bold text-gray-900">AuthFlow</span>
            </div>
            
            <div className="text-sm text-gray-600">
              &copy; {new Date().getFullYear()} AuthFlow. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
