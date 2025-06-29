# Auth0 Configuration Fix

## Current Issues:
1. **Incomplete AUDIENCE value** in your `.env` file
2. **IP restrictions** - Auth0 is blocking your IP address
3. **Missing redirect URI configuration**

## Step 1: Fix Your .env File

Update your `frontend/.env` file with these values:

```env
VITE_AUTH0_DOMAIN=dev-b1inue281c0hoyp5.ca.auth0.com
VITE_AUTH0_CLIENT_ID=goL8nqJXASyRJkjbqMVCmxkfDOXvOWHM
VITE_AUTH0_AUDIENCE=https://dev-b1inue281c0hoyp5.ca.auth0.com/api/v2/
VITE_AUTH0_REDIRECT_URI=http://localhost:8080
```

## Step 2: Auth0 Dashboard Configuration

1. **Login to Auth0 Dashboard**: https://manage.auth0.com/
2. **Go to Applications** → Your Application
3. **Settings Tab**:
   - **Allowed Callback URLs**: Add `http://localhost:8080`
   - **Allowed Logout URLs**: Add `http://localhost:8080`
   - **Allowed Web Origins**: Add `http://localhost:8080`
   - **Allowed Origins (CORS)**: Add `http://localhost:8080`

## Step 3: Fix IP Restrictions

1. **Go to Auth0 Dashboard** → **Security** → **Attack Protection**
2. **Brute Force Protection**: Temporarily disable or whitelist your IP
3. **Suspicious IP Throttling**: Add your IP to whitelist
4. **Your IP Address**: `141.117.117.215`

## Step 4: Alternative - Use Demo Mode

If Auth0 continues to block you, you can use the demo mode I implemented:

The app will automatically fall back to demo mode if Auth0 is not configured properly.

## Step 5: Test the Fix

1. Update your `.env` file
2. Restart your development server: `npm run dev`
3. Try logging in again

## Troubleshooting

If you still get blocked:
1. **Check Auth0 logs** in the dashboard
2. **Try from a different network** (mobile hotspot)
3. **Contact Auth0 support** if the issue persists
4. **Use demo mode** for development

## Demo Mode

The app includes a fallback demo mode that works without Auth0:
- No authentication required
- All features work locally
- Perfect for development and testing 