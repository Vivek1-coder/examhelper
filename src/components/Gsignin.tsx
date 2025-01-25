'use client'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { FcGoogle } from 'react-icons/fc'
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useToast } from '@/hooks/use-toast';

const Gsignin = () => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {toast} = useToast();
     const handleGoogleSignIn = async () => {
              setIsSubmitting(true);
              const result = await signIn('google', { redirect: false });
          
              if (result?.error) {
                toast({
                  title: 'Error',
                  description: result.error,
                  variant: 'destructive',
                });
              }
          
              if (result?.url) {
                router.replace('/dashboard');
              }
              setIsSubmitting(false);
            };
          
  return (
    <div>
       <Button
          className="w-full flex items-center justify-center bg-white text-gray-700 border border-gray-300"
          onClick={handleGoogleSignIn}
          disabled={isSubmitting}
        >
          <FcGoogle className="mr-2" size={20} />
          Sign In with Google
        </Button>
    </div>
  )
}

export default Gsignin
