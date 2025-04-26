
import React from "react";

const AuthLogo: React.FC = () => {
  return (
    <div className="auth-logo flex items-center justify-center">
      <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
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
      <span className="ml-3 text-xl font-bold text-gray-900">AuthFlow</span>
    </div>
  );
};

export default AuthLogo;
