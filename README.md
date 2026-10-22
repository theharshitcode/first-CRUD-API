# Task API — CRUD with Express.js

A simple REST API for managing tasks, built with Node.js and Express.js as part of the FlyRank Backend AI Engineering internship assignment (BE-01).

The API supports creating, reading, updating, and deleting tasks. It uses in-memory storage and provides interactive API documentation through Swagger UI.

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
- PostgreSQL
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
<img width="1573" height="857" alt="Screenshot 2026-10-22 130520" src="https://github.com/user-attachments/assets/bbcce623-515a-43b7-9f3c-5211209a83a3" />
<img width="1917" height="1018" alt="Screenshot 2026-10-22 130542" src="https://github.com/user-attachments/assets/1747c0aa-80e1-4b04-adaa-1b8447263516" />
<img width="892" height="791" alt="Screenshot 2026-10-22 130644" src="https://github.com/user-attachments/assets/e882d163-f762-4aa1-9a54-18d47ebe9b24" />
<img width="895" height="857" alt="Screenshot 2026-10-22 130716" src="https://github.com/user-attachments/assets/29322263-9a92-42b8-adc1-ee060b87cc0a" />
<img width="892" height="672" alt="Screenshot 2026-10-22 130734" src="https://github.com/user-attachments/assets/9ee25b7f-de17-43fb-af18-aea39f19a619" />
<img width="883" height="822" alt="Screenshot 2026-10-22 130745" src="https://github.com/user-attachments/assets/d6dd1c50-dd25-45eb-9dad-f94c26040c1a" />
<img width="888" height="585" alt="Screenshot 2026-10-22 130755" src="https://github.com/user-attachments/assets/4761c2ad-dc5b-4235-b7e4-45ec84670b91" />
Save the screenshot in your repository, for example, as `docs/swagger-ui.png`, and insert it using:

```markdown
![Swagger UI](docs/swagger-ui.png)
```

## Data Storage - PostgreSQL

# FlyRank CRUD API — PostgreSQL

A task management REST API built using Node.js,
Express.js, and PostgreSQL.

## Features

- Create a task
- Retrieve all tasks
- Retrieve a task by ID
- Update a task
- Delete a task
- Validate request data
- Persist data across server restarts

## Tech Stack

- JavaScript
- Node.js
- Express.js
- PostgreSQL
- pg

## Setup

1. Clone this repository.
2. Install dependencies:

   npm install

3. Create a PostgreSQL database named flyrank_tasks.
4. Create the tasks table.
5. Configure DATABASE_URL in your local .env file.
6. Start the server using the configured npm script.

## Database Schema

The tasks table contains:

- id: Primary key
- title: Task title
- done: Boolean completion status

## Example SQL Query

SELECT * FROM tasks;

## Database Screenshot

<img width="520" height="192" alt="Screenshot 2026-10-22 162953" src="https://github.com/user-attachments/assets/02a35201-4672-443a-be59-77ba51c016e2" />
<img width="606" height="305" alt="Screenshot 2026-10-22 163006" src="https://github.com/user-attachments/assets/5b877e3d-310c-414b-bc64-fea2fce50d07" />
<img width="603" height="162" alt="Screenshot 2026-10-22 163014" src="https://github.com/user-attachments/assets/83b9ed43-c3b8-432c-bb8f-f748617d483c" />


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
