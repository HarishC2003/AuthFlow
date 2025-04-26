
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <div className="inline-flex h-14 w-14 rounded-full bg-brand-100 text-brand-600 items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-3">404</h1>
        <p className="text-xl text-gray-600 mb-6">Page not found</p>
        <p className="text-gray-500 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="space-x-3">
          <Button asChild variant="outline">
            <Link to="/">Go back home</Link>
          </Button>
          <Button asChild className="bg-brand-600 hover:bg-brand-700">
            <Link to="/login">Sign in</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
