
export const auth0Config = {
  domain: process.env.VITE_AUTH0_DOMAIN || 'your-auth0-domain.auth0.com',
  clientId: process.env.VITE_AUTH0_CLIENT_ID || 'your-auth0-client-id',
  redirectUri: window.location.origin,
  audience: process.env.VITE_AUTH0_AUDIENCE,
};
