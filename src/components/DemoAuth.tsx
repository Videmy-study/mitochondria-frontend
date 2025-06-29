import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface DemoAuthProps {
  onLogin: (user: { name: string; email: string; picture?: string }) => void;
}

export const DemoAuth: React.FC<DemoAuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      // Demo login - accept any email/password
      if (email && password) {
        onLogin({
          name: email.split('@')[0] || 'Demo User',
          email: email,
          picture: 'https://via.placeholder.com/150/4F46E5/FFFFFF?text=U'
        });
        toast({
          title: "Demo Login Successful",
          description: "Welcome to Videmy Study!",
        });
      } else {
        toast({
          title: "Demo Login Failed",
          description: "Please enter both email and password for demo mode.",
          variant: "destructive",
        });
      }
    } else {
      // Demo signup
      if (email && password && name) {
        onLogin({
          name: name,
          email: email,
          picture: 'https://via.placeholder.com/150/4F46E5/FFFFFF?text=U'
        });
        toast({
          title: "Demo Signup Successful",
          description: "Welcome to Videmy Study!",
        });
      } else {
        toast({
          title: "Demo Signup Failed",
          description: "Please fill in all fields for demo mode.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">
            {isLogin ? 'Demo Login' : 'Demo Signup'}
          </CardTitle>
          <CardDescription className="text-gray-600">
            {isLogin 
              ? 'Enter any email and password to demo the app' 
              : 'Create a demo account to get started'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={!isLogin}
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <Button type="submit" className="w-full">
              {isLogin ? 'Demo Login' : 'Demo Signup'}
            </Button>
          </form>
          
          <div className="mt-4 text-center">
            <Button
              variant="link"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm"
            >
              {isLogin 
                ? "Don't have an account? Demo Signup" 
                : "Already have an account? Demo Login"
              }
            </Button>
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-700 text-center">
              <strong>Demo Mode:</strong> This is a development demo. 
              Any email/password combination will work for testing purposes.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 