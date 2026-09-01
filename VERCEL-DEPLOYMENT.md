# Deploy Who Goes There? on Vercel (with External Game Server)

Since Vercel doesn't support WebSockets, we split the deployment:
- **Vercel**: Hosts the Next.js frontend
- **Railway**: Hosts the Socket.IO game server

## Step 1: Deploy Game Server to Railway (5 minutes)

1. **Create a new GitHub repo for the game server:**
   ```bash
   mkdir who-goes-there-server
   cd who-goes-there-server

   # Copy these files from your main repo:
   cp ../mknepprath-next/game-server-standalone.js ./server.js
   cp ../mknepprath-next/lib/game-server.js ./game-server.js
   cp ../mknepprath-next/package-game-server.json ./package.json

   # Initialize git
   git init
   git add .
   git commit -m "Initial game server"

   # Push to GitHub
   gh repo create who-goes-there-server --public --source=. --push
   ```

2. **Deploy to Railway:**
   - Go to [Railway.app](https://railway.app)
   - Click "New Project" → "Deploy from GitHub repo"
   - Select `who-goes-there-server`
   - Railway will auto-detect Node.js and deploy
   - Copy the deployment URL (e.g., `https://who-goes-there-server-production.up.railway.app`)

## Step 2: Update Vercel Environment Variable

1. Go to your Vercel dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add:
   - **Name:** `NEXT_PUBLIC_GAME_SERVER_URL`
   - **Value:** `https://your-railway-app.railway.app` (from Step 1)
   - **Environments:** Production, Preview, Development

## Step 3: Deploy to Vercel

```bash
# In your main repo
git add .
git commit -m "Add Who Goes There with external game server"
git push origin master
```

Vercel will auto-deploy!

## Step 4: Test It

1. Visit `https://your-site.vercel.app/who-goes-there`
2. Create a game
3. Open on phone, join with code
4. Play!

---

## Alternative: Quick Setup (Use Railway for Everything)

If you want the FASTEST setup:

1. **Deploy entire app to Railway instead of Vercel:**
   ```bash
   # Just push your repo to Railway
   # Railway supports both Next.js AND Socket.IO
   ```

2. **Benefits:**
   - Single deployment
   - No environment variables needed
   - WebSockets work natively

3. **Trade-off:**
   - Not using Vercel (but Railway is just as good for this use case)

---

## Which Should You Choose?

**Use Vercel + Railway if:**
- You want to keep your main site on Vercel
- You have other pages that benefit from Vercel's edge network
- You don't mind managing two deployments

**Use Railway for everything if:**
- You want simplest setup (one deployment)
- This is primarily a game site
- You want faster deployment (no environment variables)

## Cost

Both options have free tiers that work for this:
- **Railway Free:** 500 hours/month, $5 credit
- **Vercel Free:** Unlimited bandwidth (with limits)

For a small game, both free tiers are plenty!
