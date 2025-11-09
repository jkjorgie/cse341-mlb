# cse341-mlb

Major League Baseball Data API

A Node.js REST API for managing MLB teams and Cy Young Award winners data.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB database

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables (optional):

   ```bash
   # Create .env file
   MONGODB_URI=mongodb://localhost:27017/mlb_data
   DB_NAME=mlb_data
   PORT=3000
   ```

4. Start the server:
   ```bash
   npm start
   ```

The server will run at `http://localhost:3000`

## API Documentation

Interactive API documentation is available at: `http://localhost:3000/api-docs/`

The documentation is organized into the following sections:

- **teams**: Team management operations (create, read, update, delete teams)
- **cy-young-winners**: Cy Young Award winner operations (create, read, update, delete winners)

## API Endpoints

### Teams

#### GET /api/teams

Get all teams with optional filtering.

**Query Parameters:**

- `league` (string): Filter by league (AL/NL)
- `division` (string): Filter by division

**Example:**

```bash
GET /api/teams?league=AL&division=East
```

#### GET /api/teams/:id

Get a specific team by ID.

#### POST /api/teams

Create a new team.

**Request Body:**

```json
{
  "name": "Yankees",
  "city": "New York",
  "league": "AL",
  "division": "East",
  "stadium": "Yankee Stadium"
}
```

#### PUT /api/teams/:id

Update an existing team.

#### DELETE /api/teams/:id

Delete a team.

### Cy Young Winners

#### GET /api/cy-young-winners

Get all Cy Young Award winners with optional filtering.

**Query Parameters:**

- `year` (number): Filter by year
- `league` (string): Filter by league (AL/NL)
- `player` (string): Search by player name (case-insensitive)

**Example:**

```bash
GET /api/cy-young-winners?year=2020&league=AL
```

#### GET /api/cy-young-winners/year/:year

Get all Cy Young winners for a specific year.

#### GET /api/cy-young-winners/:id

Get a specific Cy Young winner by ID.

#### POST /api/cy-young-winners

Create a new Cy Young winner record.

**Request Body:**

```json
{
  "player": "Gerrit Cole",
  "team": "Yankees",
  "year": 2020,
  "league": "AL",
  "era": 2.84,
  "wins": 7,
  "strikeouts": 94
}
```

#### PUT /api/cy-young-winners/:id

Update a Cy Young winner record.

#### DELETE /api/cy-young-winners/:id

Delete a Cy Young winner record.

## Response Format

The API follows standard REST conventions:

**Success Response (GET):**

```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Yankees",
    "city": "New York",
    ...
  }
]
```

**Success Response (GET single):**

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Yankees",
  "city": "New York",
  ...
}
```

**Success Response (POST):**

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Yankees",
  "city": "New York",
  ...
}
```

**Success Response (PUT/DELETE):**

```http
204 No Content
```

**Error Response:**

```json
{
  "message": "An error occurred while creating the team"
}
```

## Project Structure

```
cse341-mlb/
├── controllers/
│   ├── teamsController.js    # Teams controller with CRUD operations
│   └── cyYoungController.js  # Cy Young winners controller with CRUD operations
├── routes/
│   ├── index.js              # Main routes router
│   ├── swagger.js            # Swagger documentation routes
│   ├── teams.js              # Teams API routes
│   └── cyYoungWinners.js     # Cy Young winners API routes
├── server.js                 # Express server setup
├── package.json
└── README.md
```

## Database

The application connects to MongoDB and uses two collections:

- `teams`: Stores team information
- `cy_young_winners`: Stores Cy Young Award winner data

Set the MongoDB connection string using the `MONGODB_URI` environment variable. Defaults to `mongodb://localhost:27017/mlb_data`.
