# TypeScript Express Todo API

A simple Todo REST API built with Express + TypeScript, using in-memory storage.

## Features

- CRUD endpoints for todos
- Input validation with Zod
- Centralized error handling middleware
- Test coverage for all endpoints using Jest + Supertest

## Setup

```bash
npm install
```

## Run in development

```bash
npm run dev
```

## Build and run production

```bash
npm run build
npm start
```

## Run tests

```bash
npm test
```

## API Endpoints

- `GET /health`
- `GET /todos`
- `GET /todos/:id`
- `POST /todos`
- `PUT /todos/:id`
- `DELETE /todos/:id`

## Example curl commands

### Create todo

```bash
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Buy milk"}'
```

### Get all todos

```bash
curl http://localhost:3000/todos
```

### Get todo by id

```bash
curl http://localhost:3000/todos/1
```

### Update todo

```bash
curl -X PUT http://localhost:3000/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Buy milk and bread","completed":true}'
```

### Delete todo

```bash
curl -X DELETE http://localhost:3000/todos/1 -i
```

## Notes

Data is stored in memory and will be reset when the server restarts.
