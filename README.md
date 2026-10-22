# Task API — CRUD with Express.js

A simple REST API for managing tasks, built with Node.js and Express.js as part of the FlyRank Backend AI Engineering internship assignment (BE-01).

The API supports creating, reading, updating, and deleting tasks. It uses in-memory storage and provides interactive API documentation through Swagger UI.

<img width="1573" height="857" alt="Screenshot 2026-10-22 130520" src="https://github.com/user-attachments/assets/bbcce623-515a-43b7-9f3c-5211209a83a3" />


## Features

- Create a task with a title
- Retrieve all tasks or a single task by ID
- Update a task's title and completion status
- Delete a task
- Validate incoming request data
- Return appropriate HTTP status codes and JSON errors
- Test endpoints through Swagger UI

## Tech Stack

- Node.js
- Express.js
- JavaScript
- Swagger UI Express
- OpenAPI 3.0
- Git and GitHub

## Getting Started

### Prerequisites

- Node.js and npm installed
- Git installed

### Installation

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd flyrank-crud-api
```

Install dependencies:

```bash
npm install
```

### Run the server

Use the command appropriate for your project setup. If your entry point is `src/app.js` and it starts the server directly:

```bash
node src/app.js
```

The server should be available at:

```text
http://localhost:3000
```

## API Endpoints

Base URL: `http://localhost:3000`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Returns API information |
| GET | `/health` | Checks server health |
| GET | `/tasks` | Retrieves all tasks |
| GET | `/tasks/:id` | Retrieves a task by ID |
| POST | `/tasks` | Creates a new task |
| PUT | `/tasks/:id` | Updates a task |
| DELETE | `/tasks/:id` | Deletes a task |

## Example Requests

### Get all tasks

```bash
curl -i http://localhost:3000/tasks
```

### Get a task by ID

```bash
curl -i http://localhost:3000/tasks/1
```

### Create a task

```bash
curl -i -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Buy milk"}'
```

### Update a task

```bash
curl -i -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Learn Express deeply"}'
```

### Delete a task

```bash
curl -i -X DELETE http://localhost:3000/tasks/1
```

## Example Task Object

```json
{
  "id": 1,
  "title": "Learn JavaScript",
  "done": true
}
```

## HTTP Status Codes

| Status | Meaning |
|---|---|
| `200 OK` | Request successful |
| `201 Created` | Task created successfully |
| `204 No Content` | Task deleted successfully |
| `400 Bad Request` | Invalid request body |
| `404 Not Found` | Task does not exist |

## Swagger UI

Interactive API documentation is available at:

```text
http://localhost:3000/docs
```

Open Swagger UI while the server is running. Use **Try it out** to send requests to the available endpoints.

### Swagger Screenshot

Add a screenshot of your working Swagger UI here.

Save the screenshot in your repository, for example, as `docs/swagger-ui.png`, and insert it using:

```markdown
![Swagger UI](docs/swagger-ui.png)
```

## Data Storage

This project stores tasks in an in-memory JavaScript array. No database is used.

**Important:** Task data is temporary and resets when the server restarts.

## Error Handling and Validation

- A task must have a non-empty title when creating it.
- Update requests validate the fields being changed.
- Requests for unknown task IDs return `404 Not Found`.
- Invalid input returns `400 Bad Request`.

## Learning Outcomes

Through this assignment, I practised:

- Building REST API endpoints with Express.js
- Understanding HTTP methods and status codes
- Reading path parameters and JSON request bodies
- Validating incoming data
- Implementing CRUD operations
- Documenting APIs using OpenAPI and Swagger UI
- Testing endpoints and managing code with Git

## Author

Harshit Saxena

## Assignment

FlyRank AI Internship — Backend AI Engineering

**Assignment:** BE-01 — Build Your First CRUD API
