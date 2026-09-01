# Who Goes There? - Development Plan

## Overview
Convert the HTML game files into a fully functional multiplayer web game with real-time sync.

## Game Summary
- 2-4 players build a research station using playing cards
- Each player has a secret suit (one is "The Thing")
- Players place cards to build corridors from a central starting room
- When deck runs out, reveal which suit is infected
- Infected suit cards become impassable walls
- Win condition: Can humans still reach the exit, or has The Thing trapped them?

## Technical Requirements

### 1. Real-time Multiplayer Infrastructure
- **WebSocket/Socket.IO** for real-time game state sync
- **Room-based game management** with unique game codes
- **Player connection/disconnection handling**
- **Turn-based game flow** with timeout protection

### 2. Game Logic Implementation
- **Card deck management** (40 number cards, 4 suits)
- **Secret role assignment** (each player gets hidden suit)
- **Grid placement validation** (2x2 rule enforcement)
- **Path-finding algorithm** for win condition checking
- **Thing reveal and infection mechanics**

### 3. Frontend Components
- **Game lobby** (create/join with codes)
- **Interactive game board** (draggable card placement)
- **Player hand management** (card selection/placement)
- **Real-time game state updates** (other players' moves)
- **End game reveal sequence** (show infected areas and escape path)

### 4. Data Models
```typescript
interface GameState {
  id: string;
  players: Player[];
  grid: Map<string, Card>;
  currentPlayer: number;
  deck: Card[];
  hands: Card[][];
  phase: 'waiting' | 'playing' | 'revealed';
  thingSuit?: string;
  winner?: 'humans' | 'thing';
}
```

## Implementation Steps

### Phase 1: Infrastructure Setup (30 min)
- [ ] Add Socket.IO dependencies to package.json
- [ ] Create custom Next.js server with Socket.IO support
- [ ] Set up basic room management and connection handling
- [ ] Test WebSocket connectivity

### Phase 2: Game Logic Core (45 min)
- [ ] Implement card deck creation and shuffling
- [ ] Build grid placement validation (2x2 rule)
- [ ] Create path-finding algorithm for win detection
- [ ] Implement game state management
- [ ] Unit test core game mechanics

### Phase 3: API Layer (30 min)
- [ ] Create Socket.IO event handlers (join, create, place, reveal)
- [ ] Implement turn management and validation
- [ ] Add player timeout/disconnection handling
- [ ] Error handling and edge cases

### Phase 4: Frontend Game Board (45 min)
- [ ] Build responsive grid rendering system
- [ ] Implement card placement interaction
- [ ] Add visual feedback for valid/invalid moves
- [ ] Create hand management interface
- [ ] Real-time state synchronization

### Phase 5: UI/UX Polish (30 min)
- [ ] Add game lobby with join/create flows
- [ ] Implement reveal sequence animations
- [ ] Add visual indicators for infected cards and escape path
- [ ] Mobile responsive design
- [ ] Error messages and loading states

### Phase 6: Testing & Deployment (20 min)
- [ ] Multi-player testing with different scenarios
- [ ] Edge case testing (disconnections, invalid moves)
- [ ] Performance testing with max players
- [ ] Deploy and test in production environment

## Key Technical Challenges

### 1. Real-time Synchronization
- Ensure all players see moves instantly
- Handle network latency and disconnections gracefully
- Prevent race conditions in turn-based gameplay

### 2. Game Logic Complexity
- **2x2 Placement Rule**: Cannot create rectangles larger than 2x2
- **Path Finding**: BFS algorithm to check connectivity after reveal
- **Edge Cases**: Player disconnection mid-game, invalid placements

### 3. State Management
- Maintain authoritative game state on server
- Efficient client-side state updates
- Handle browser refresh/reconnection

### 4. Performance Considerations
- Minimize WebSocket message frequency
- Efficient grid rendering for larger maps
- Memory cleanup for abandoned games

## Success Criteria
- [ ] 4 players can successfully create and join games
- [ ] Game rules are correctly implemented and enforced
- [ ] Real-time gameplay feels responsive (<100ms latency)
- [ ] Win/lose conditions work correctly in all scenarios
- [ ] Mobile and desktop experiences are polished
- [ ] Game handles edge cases gracefully

## Estimated Timeline: 3-4 hours total

## Files to Modify/Create
- `package.json` - Add Socket.IO dependencies
- `server.js` - Custom Next.js server with WebSocket support
- `pages/api/socketio.ts` - Socket.IO handler
- `pages/who-goes-there.tsx` - Game component (already created)
- `pages/who-goes-there.module.css` - Styling (already created)
- `lib/game-logic.ts` - Core game mechanics
- `lib/socket-client.ts` - Client-side Socket.IO wrapper

## Risk Mitigation
- **Scope creep**: Focus on core functionality first, polish later
- **WebSocket complexity**: Use Socket.IO for robust connection handling
- **Game balance**: Stick to original rules exactly as specified
- **Performance**: Test with 4 concurrent players early