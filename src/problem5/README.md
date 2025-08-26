# Resource Management API
## Features

* Create, read, update, and delete resources
* Query filtering by `status`, `tags`, `createdAt`, etc.
* Validation middleware for request body and query params
* MongoDB integration with Mongoose
* Written in TypeScript

## Requirements

* Node.js >= 18
* npm
* MongoDB instance running locally

## Installation

```bash
git clone https://github.com/duc1003/code_challenge
cd ./src/problem5
npm i
```

Create a `.env` file in the root folder:

```env
PORT=8888
MONGODB_URI=mongodb://localhost:27017/codeChallengeDB
```

## Running the Application

### Development mode

```bash
npm run dev
```
Server runs at: [http://localhost:8888](http://localhost:8888)

---

## API Endpoints

### 1. Create a resource

```http
POST /api/resources
```

#### Request Body

```json
{
  "title": "First Resource",
  "description": "This is my first resource",
  "tags": ["intro", "demo"],
  "status": "draft",
  "metadata": {
    "author": "John Doe",
    "priority": 1
  }
}
```

#### Example Response

```json
{
  "id": "66cfa1d54b9b8e12c3f0a1e7",
  "title": "First Resource",
  "description": "This is my first resource",
  "tags": ["intro", "demo"],
  "status": "draft",
  "metadata": {
    "author": "John Doe",
    "priority": 1
  },
  "createdAt": "2025-08-24T10:30:00.123Z",
  "updatedAt": "2025-08-24T10:30:00.123Z"
}
```

---

### 2. List resources

```http
GET /api/resources?q=first&status=draft&page=1&limit=10
```

#### Example Response

```json
{
  "page": 1,
  "limit": 10,
  "total": 1,
  "data": [
    {
      "id": "66cfa1d54b9b8e12c3f0a1e7",
      "title": "First Resource",
      "description": "This is my first resource",
      "tags": ["intro", "demo"],
      "status": "draft",
      "metadata": {
        "author": "John Doe",
        "priority": 1
      },
      "createdAt": "2025-08-24T10:30:00.123Z",
      "updatedAt": "2025-08-24T10:30:00.123Z"
    }
  ]
}
```

---

### 3. Get a single resource

```http
GET /api/resources/:id
```

#### Example Response

```json
{
  "id": "66cfa1d54b9b8e12c3f0a1e7",
  "title": "First Resource",
  "description": "This is my first resource",
  "tags": ["intro", "demo"],
  "status": "draft",
  "metadata": {
    "author": "John Doe",
    "priority": 1
  },
  "createdAt": "2025-08-24T10:30:00.123Z",
  "updatedAt": "2025-08-24T10:30:00.123Z"
}
```

---

### 4. Update a resource

```http
PATCH /api/resources/:id
```

#### Request Body

```json
{
  "title": "Updated Title",
  "status": "published"
}
```

#### Example Response

```json
{
  "id": "66cfa1d54b9b8e12c3f0a1e7",
  "title": "Updated Title",
  "description": "This is my first resource",
  "tags": ["intro", "demo"],
  "status": "published",
  "metadata": {
    "author": "John Doe",
    "priority": 1
  },
  "createdAt": "2025-08-24T10:30:00.123Z",
  "updatedAt": "2025-08-24T11:00:00.456Z"
}
```

---

### 5. Delete a resource

```http
DELETE /api/resources/:id
```

#### Example Response

```json
{
  "message": "Resource deleted successfully"
}
```
