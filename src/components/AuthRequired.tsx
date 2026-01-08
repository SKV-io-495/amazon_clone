'use client';

import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import Button from '@/components/ui/Button';

export default function AuthRequired({ title = "Authentication Required" }: { title?: string }) {
  const handleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google"
    });
  };

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 bg-white">
      <div className="w-full max-w-md border border-gray-300 rounded p-8 text-center shadow-sm">
        <h1 className="text-2xl font-normal mb-4">{title}</h1>
        <p className="text-gray-600 mb-6">
          Please sign in to view this page and access your account information.
        </p>
        
        <div className="space-y-4">
          <Button 
            onClick={handleSignIn} 
            variant="primary" 
            className="w-full"
          >
            Sign in with Google
          </Button>
          
          <div className="text-xs text-gray-500 mt-4">
            New to Amazon? <span className="text-[#007185] hover:underline cursor-pointer" onClick={handleSignIn}>Create your Amazon account</span>
          </div>
        </div>
      </div>
    </div>
  );
}
