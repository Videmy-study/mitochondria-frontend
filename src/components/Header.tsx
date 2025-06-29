
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sparkles, User, Settings, LogOut, Plus, Home, Search, TrendingUp } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface HeaderProps {
  user?: {
    username: string;
    avatar: string;
    displayName: string;
  };
  onCreateVideo: () => void;
  onLogin: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onCreateVideo, onLogin, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/explore', label: 'Explore', icon: Search },
    { path: '/trending', label: 'Trending', icon: TrendingUp }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigate('/')}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              VideoAI
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Button
                  key={item.path}
                  variant={isActive ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => navigate(item.path)}
                  className="gap-2"
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Button>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button
              onClick={onCreateVideo}
              className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Create</span>
            </Button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.username} />
                      <AvatarFallback>{user.displayName[0]}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user.displayName}</p>
                      <p className="text-xs text-muted-foreground">@{user.username}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate(`/profile/${user.username}`)}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={onLogin} variant="outline">
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
