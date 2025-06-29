
import { useAuth0 } from '@auth0/auth0-react';

export const useAuth0Custom = () => {
  const {
    isAuthenticated,
    isLoading,
    user,
    loginWithRedirect,
    logout,
    error
  } = useAuth0();

  const loginWithGoogle = () => {
    loginWithRedirect({
      connection: 'google-oauth2',
    });
  };

  const loginWithGithub = () => {
    loginWithRedirect({
      connection: 'github',
    });
  };

  const loginWithEmail = () => {
    loginWithRedirect({
      connection: 'Username-Password-Authentication',
    });
  };

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin
      }
    });
  };

  return {
    isAuthenticated,
    isLoading,
    user,
    loginWithGoogle,
    loginWithGithub,
    loginWithEmail,
    logout: handleLogout,
    error
  };
};
