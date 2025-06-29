
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Github, Mail, Sparkles } from 'lucide-react';
import { useAuth0Custom } from '@/hooks/useAuth0Custom';
import DecryptedText from './DecryptedText';
import GlowButton from './GlowButton';

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LoginDialog: React.FC<LoginDialogProps> = ({ open, onOpenChange }) => {
  const { loginWithGoogle, loginWithGithub, loginWithEmail, isLoading } = useAuth0Custom();

  const handleGoogleLogin = () => {
    loginWithGoogle();
    onOpenChange(false);
  };

  const handleGithubLogin = () => {
    loginWithGithub();
    onOpenChange(false);
  };

  const handleEmailLogin = () => {
    loginWithEmail();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-[95vw] bg-background border-border p-0 gap-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Sign In</DialogTitle>
        </DialogHeader>
        
        <Card className="border-0 shadow-none bg-transparent">
          <CardHeader className="text-center space-y-4 pb-6">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-8 h-8 text-purple-600" />
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                <DecryptedText text="Welcome to VideoAI" delay={100} />
              </h2>
            </div>
            <p className="text-muted-foreground">
              <DecryptedText text="Sign in to create amazing AI videos" delay={500} />
            </p>
          </CardHeader>

          <CardContent className="space-y-4 p-6">
            <GlowButton
              onClick={handleGoogleLogin}
              disabled={isLoading}
              glowColor="red"
              className="w-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 shadow-sm hover:shadow-md transition-all duration-200 gap-3 py-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </GlowButton>

            <GlowButton
              onClick={handleGithubLogin}
              disabled={isLoading}
              glowColor="gray"
              className="w-full bg-gray-900 hover:bg-gray-800 text-white border border-gray-700 shadow-sm hover:shadow-md transition-all duration-200 gap-3 py-3"
            >
              <Github className="w-5 h-5" />
              Continue with GitHub
            </GlowButton>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or</span>
              </div>
            </div>

            <GlowButton
              onClick={handleEmailLogin}
              disabled={isLoading}
              glowColor="blue"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md transition-all duration-200 gap-3 py-3"
            >
              <Mail className="w-5 h-5" />
              Continue with Email
            </GlowButton>

            <p className="text-xs text-center text-muted-foreground mt-6">
              By signing in, you agree to our Terms of Service and Privacy Policy.
            </p>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
