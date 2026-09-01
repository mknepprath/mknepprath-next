# Deployment Guide for Who Goes There?

## ⚠️ Important: Socket.IO Requirements

This game uses Socket.IO for real-time multiplayer, which requires:
- **WebSocket support**
- **Long-lived connections**
- **Traditional server** (NOT serverless)

❌ **Won't work on:** Vercel, Netlify, AWS Lambda, Cloudflare Pages
✅ **Will work on:** Heroku, Railway, DigitalOcean, Render, Fly.io, AWS EC2, VPS

---

## Pre-Deployment Checklist

✅ Updated `package.json` start script to use `node server.js`
✅ Server uses `process.env.PORT` for production port
✅ Socket.IO configured for production
✅ Fonts loaded globally
✅ Full-screen game layout

---

## Deployment Options

### Option 1: Railway (Recommended - Easy)

1. Push your code to GitHub
2. Go to [Railway.app](https://railway.app)
3. Click "Start a New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway will auto-detect Node.js and deploy

**Environment Variables:**
- `NODE_ENV=production` (Railway sets this automatically)
- Port is automatically assigned

### Option 2: Heroku

1. Install Heroku CLI
2. Create `Procfile` in your project root:
   ```
   web: npm start
   ```
3. Deploy:
   ```bash
   heroku create your-app-name
   git push heroku master
   ```

### Option 3: DigitalOcean App Platform

1. Push to GitHub
2. Go to DigitalOcean App Platform
3. Create new app from GitHub repo
4. Set build command: `npm run build`
5. Set run command: `npm start`

### Option 4: VPS/Server (Most Control)

```bash
# On your server
git clone https://github.com/mknepprath/mknepprath-next.git
cd mknepprath-next
npm install
npm run build
npm start
```

**Use PM2 for production:**
```bash
npm install -g pm2
pm2 start server.js --name "who-goes-there"
pm2 save
pm2 startup
```

---

## Build Process

Before deploying, test the production build locally:

```bash
# Build the Next.js app
npm run build

# Start production server
npm start

# Visit http://localhost:3000 (or configured PORT)
```

---

## Environment Variables

Required for production:
- `NODE_ENV=production` - Enables production mode
- `PORT` - Port to run on (default: 3001, but use platform default)

---

## Post-Deployment

### Test the deployment:

1. **Single Player Test:**
   - Visit `https://your-domain.com/who-goes-there`
   - Create a game
   - Verify you get a game code

2. **Multiplayer Test:**
   - Open in two different devices/browsers
   - Player 1: Create game
   - Player 2: Join with code
   - Both should see each other in lobby
   - Start game and play a few turns

3. **WebSocket Check:**
   - Open browser console (F12)
   - Look for "Connected to server" message
   - Should NOT see connection errors

---

## Troubleshooting

### "Multiplayer Temporarily Unavailable" message:
- Socket.IO isn't connecting
- Check if platform supports WebSockets
- Verify server is running `server.js` not `next start`

### Players can't join games:
- Check server logs for "Player joined game" messages
- Verify both players are on same deployment (not mix of local/prod)

### Game state not syncing:
- Check server memory - games stored in RAM
- Consider adding Redis for persistence if needed

---

## Monitoring

Add these logs to track game activity:

```bash
# View logs (Railway/Heroku)
railway logs
# or
heroku logs --tail

# Look for:
- "Player connected"
- "Game created"
- "Player joined game"
- "Game started"
```

---

## Scaling Considerations

Current setup uses in-memory storage:
- ✅ Good for: <100 concurrent games
- ❌ Issue: Games lost on server restart
- 🔄 Future: Add Redis for persistence

---

## Domain Setup

Point your domain to the deployment:
1. Add CNAME or A record pointing to your server
2. Update Socket.IO CORS if needed (already set to allow all origins)
3. Consider adding SSL/HTTPS (most platforms include this)

---

## Ready to Deploy?

1. Commit your changes:
   ```bash
   git add .
   git commit -m "Add Who Goes There multiplayer game"
   git push origin master
   ```

2. Choose a deployment platform above
3. Deploy!
4. Test multiplayer with friends
5. Share the game code! 🎮

---

## Questions?

- Server not starting? Check `npm start` locally first
- Socket.IO errors? Verify WebSocket support on platform
- Games not persisting? Expected - using in-memory storage
