# Who Goes There? - Multiplayer Game

## How to Play

The multiplayer version of "Who Goes There?" is now fully set up and ready to test!

## Running the Game

The server is already running on **http://localhost:3001**

### To Test Multiplayer:

1. **Player 1**: Open http://localhost:3001/who-goes-there in your browser
2. Click "Create Game" and enter your name
3. You'll receive a 6-character game code
4. **Player 2-4**: Open http://localhost:3001/who-goes-there in different browser windows/tabs (or on different computers on the same network)
5. Click "Join Game" and enter the game code from Player 1
6. Once 2-4 players have joined, any player can click "Start Game"

### Gameplay:

1. **Building Phase**: Players take turns placing cards from their hand onto the grid
   - Cards must be placed adjacent to existing cards
   - Cannot create rectangles larger than 2x2
   - Draw 1 card, place 1 card each turn

2. **The Reveal**: When the deck runs out, click "Flip the Thing Card"
   - The center Queen card is revealed showing the infected suit
   - All cards of that suit become impassable walls
   - Check if there's still a path from the center to the exit (10 of the same color, opposite suit)

3. **Victory**:
   - **Humans Win**: If a path exists to the exit
   - **Thing Wins**: If the path is blocked

## Testing on Different Computers

To play from different computers on the same local network:

1. Find your computer's local IP address:
   - Mac: System Settings → Network → Your connection → IP address
   - Or run: `ipconfig getifaddr en0` (Wi-Fi) or `ipconfig getifaddr en1` (Ethernet)

2. Other players should visit: `http://YOUR_IP_ADDRESS:3001/who-goes-there`
   - Example: `http://192.168.1.100:3001/who-goes-there`

## Technical Details

- **Real-time sync**: Uses Socket.IO for instant updates across all players
- **Game state**: Managed on the server, synchronized to all clients
- **Persistence**: Games are kept in memory for 2 hours of inactivity
- **Connection handling**: Automatic reconnection and player status tracking

## Files Modified/Created:

1. ✅ `server.js` - Custom Next.js server with Socket.IO
2. ✅ `lib/game-server.js` - Core game logic
3. ✅ `pages/who-goes-there.tsx` - Frontend React component
4. ✅ `pages/who-goes-there.module.css` - Styling
5. ✅ `pages/api/v1/who-goes-there.ts` - REST API (backup/reference)

## Known Features:

- ✅ Create/join games with 6-character codes
- ✅ 2-4 player support
- ✅ Real-time card placement
- ✅ Turn-based gameplay
- ✅ 2x2 grid placement rule enforcement
- ✅ Automatic win/loss detection after reveal
- ✅ Visual path highlighting after reveal
- ✅ Player connection status indicators
- ✅ Responsive design (mobile-friendly)

## Troubleshooting:

**Connection issues?**
- Make sure you're accessing the page on port 3001 (not 3000)
- Check that the server is running (`npm run dev`)
- Look for console errors in browser developer tools

**Game not updating?**
- Check the Socket.IO connection status (should say "Connected to server")
- Try refreshing the page
- Make sure all players are using the correct game code

**Port already in use?**
- Change the port in `server.js` line 186: `const port = process.env.PORT || 3001;`
- Use a different port like 3002 or 3003

## Enjoy!

The game is inspired by John Carpenter's "The Thing" (1982) - can you build a station that survives the infection, or will The Thing trap you all inside?
