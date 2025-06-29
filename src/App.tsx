import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Auth0Provider } from '@auth0/auth0-react';
import { auth0Config } from './config/auth0';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { DemoAuth } from "./components/DemoAuth";
import { useState } from "react";

const queryClient = new QueryClient();

// Check if Auth0 is properly configured
const isAuth0Configured = () => {
  return auth0Config.domain && 
         auth0Config.domain !== 'your-auth0-domain.auth0.com' &&
         auth0Config.clientId && 
         auth0Config.clientId !== 'your-auth0-client-id';
};

const App = () => {
  const [demoUser, setDemoUser] = useState<{ name: string; email: string; picture?: string } | null>(null);

  // If Auth0 is not configured, use demo mode
  if (!isAuth0Configured()) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            {demoUser ? (
              <Routes>
                <Route path="/" element={<Index demoUser={demoUser} />} />
                <Route path="/profile/:username" element={<Index demoUser={demoUser} />} />
                <Route path="/video/:id" element={<Index demoUser={demoUser} />} />
                <Route path="/create" element={<Index demoUser={demoUser} />} />
                <Route path="/explore" element={<Index demoUser={demoUser} />} />
                <Route path="/trending" element={<Index demoUser={demoUser} />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            ) : (
              <DemoAuth onLogin={setDemoUser} />
            )}
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  // Use Auth0 if properly configured
  return (
    <Auth0Provider
      domain={auth0Config.domain}
      clientId={auth0Config.clientId}
      authorizationParams={{
        redirect_uri: auth0Config.redirectUri,
        audience: auth0Config.audience,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/profile/:username" element={<Index />} />
              <Route path="/video/:id" element={<Index />} />
              <Route path="/create" element={<Index />} />
              <Route path="/explore" element={<Index />} />
              <Route path="/trending" element={<Index />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </Auth0Provider>
  );
};

export default App;
