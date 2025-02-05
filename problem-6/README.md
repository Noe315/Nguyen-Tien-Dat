# Live Scoreboard System Specification

## Overview
- This module is used to record and display a score board, where it needs to provide these funcitonalities:
	+ Shows top 10 (or n) users with highest score.
	+ Ensures real-time updates for the scoreboard.
	+ Implements security measures to prevent unauthorized score modifications.

## System Architecture

![System Architecture](system-arch.jpg)

## Technical Stack
- Backend: TypeScript + Express.js
- Database: PostgreSQL with Prisma ORM
- Real-time: WebSocket (ws package)
- Authentication: JWT

## Core Components

### 1. Database Schema (Prisma)
```prisma
model User {
  id        String   @id @default(uuid())
  username  String   @unique
  score     Int      @default(0)
  actions   Action[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Action {
  id        String   @id
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  score     Int
  createdAt DateTime @default(now())
  actionType String

  @@unique([id, userId])
}
```

### 2. API Endpoints

#### Score Update Endpoint
- **URL**: `/api/scores`
- **Method**: POST
- **Authentication**: Required (JWT)
- **Request Body**:
  ```typescript
  {
    actionType: string;  // Type of action (e.g., 'follow', 'repost', 'like')
  }
  ```
- **Response**:
  ```typescript
  {
    success: boolean;
    newScore: number;
    rank: number;
  }
  ```

#### Get Top Scores Endpoint
- **URL**: `/api/scores/top`
- **Method**: GET
- **Authentication**: Optional
- **Response**:
  ```typescript
  {
    scores: Array<{
      username: string;
      score: number;
      rank: number;
    }>
  }
  ```

### 3. WebSocket Events

#### Client -> Server
- `subscribe`: Subscribe to score updates
- `unsubscribe`: Unsubscribe from updates

#### Server -> Client
- `scoreUpdate`: Emitted when any user's score changes
  ```typescript
  {
    type: 'scoreUpdate';
    data: {
      topScores: Array<{
        username: string;
        score: number;
        rank: number;
      }>;
    }
  }
  ```

## Security Measures

1. **Authentication**
    - JWT-based authentication for all score update requests
    - Tokens must be included in Authorization header

2. **Rate Limiting**
    - Assuming every call to the API is a valid score update, there's no need for rate limiting.

3. **Data Validation**
    - Input sanitization for all API endpoints

## Database Setup Instructions

1. Start PostgreSQL container:
```bash
docker run --name scoreboard-db \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=your_password \
  -e POSTGRES_DB=scoreboard \
  -p 5432:5432 \
  -d postgres:latest
```

2. Database Connection URL format:
```
postgresql://admin:your_password@localhost:5432/scoreboard
```

## Implementation Recommendations

1. **Caching Strategy**
    - Implement Redis caching for top scores to reduce database load
    - Cache invalidation on score updates

2. **Testing**
    - Unit tests for score calculation logic
    - Integration tests for API endpoints
    - Load testing for WebSocket connections
    - Security testing for authentication

## Error Handling

1. **API Errors**
    - Use standard HTTP status codes
    - Include detailed error messages in development
    - Sanitize error responses in production

2. **WebSocket Errors**
    - Implement automatic reconnection
    - Handle connection timeouts
    - Provide fallback to polling if WebSocket fails

## Future Improvements
  - Add historical score tracking
  - Implement achievement system
  - Add user statistics and analytics
