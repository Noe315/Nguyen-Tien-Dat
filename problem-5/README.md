# Express TypeScript CRUD API

This is a RESTful API built with Express.js and TypeScript that provides CRUD operations for managing resources.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or accessible URL)
- npm or yarn package manager

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
PORT=3000
MONGODB_URI=mongodb://admin:password123@localhost:27017/resource-db?authSource=admin
```

4. Run MongoDB container:
```bash
docker run -d \
  --name resource-mongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password123 \
  mongo:latest
```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
1. Build the application:
```bash
npm run build
```

2. Start the server:
```bash
npm start
```

## API Endpoints

### Resources
- `POST /api/resources` - Create a new resource
- `GET /api/resources` - List all resources
  - Query parameters:
    - `status`: Filter by status (active/inactive)
    - `search`: Search in title and description
- `GET /api/resources/:id` - Get a specific resource
- `PUT /api/resources/:id` - Update a resource
- `DELETE /api/resources/:id` - Delete a resource

## Request/Response Examples

### Create Resource
```bash
POST /api/resources
Content-Type: application/json

{
  "title": "Example Resource",
  "description": "This is an example resource",
  "status": "active"
}
```

### List Resources with Filters
```bash
GET /api/resources?status=active&search=example
```

## Error Handling

The API returns appropriate HTTP status codes and error messages:
- 200: Success
- 201: Resource created
- 400: Bad request
- 404: Resource not found
- 500: Server error
