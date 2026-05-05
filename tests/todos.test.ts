import request from 'supertest';
import app from '../src/app';
import { resetTodos } from '../src/store/todoStore';

describe('Todo API', () => {
  beforeEach(() => {
    resetTodos();
  });

  it('GET /health should return ok', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
  });

  it('GET /todos should return empty array initially', async () => {
    const response = await request(app).get('/todos');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('POST /todos should create todo', async () => {
    const response = await request(app).post('/todos').send({ title: 'Learn TS' });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      id: 1,
      title: 'Learn TS',
      completed: false
    });
    expect(response.body.createdAt).toBeDefined();
    expect(response.body.updatedAt).toBeDefined();
  });

  it('POST /todos should reject invalid payload', async () => {
    const response = await request(app).post('/todos').send({ title: '' });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Validation failed');
  });

  it('GET /todos/:id should return created todo', async () => {
    const created = await request(app).post('/todos').send({ title: 'Task 1' });
    const response = await request(app).get(`/todos/${created.body.id}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(created.body.id);
    expect(response.body.title).toBe('Task 1');
  });

  it('GET /todos/:id should return 404 for missing todo', async () => {
    const response = await request(app).get('/todos/999');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Todo not found' });
  });

  it('PUT /todos/:id should update todo', async () => {
    const created = await request(app).post('/todos').send({ title: 'Old title' });
    const response = await request(app)
      .put(`/todos/${created.body.id}`)
      .send({ title: 'New title', completed: true });

    expect(response.status).toBe(200);
    expect(response.body.title).toBe('New title');
    expect(response.body.completed).toBe(true);
  });

  it('PUT /todos/:id should return 400 when body empty', async () => {
    const created = await request(app).post('/todos').send({ title: 'Task' });
    const response = await request(app).put(`/todos/${created.body.id}`).send({});

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Validation failed');
  });

  it('DELETE /todos/:id should delete todo', async () => {
    const created = await request(app).post('/todos').send({ title: 'Delete me' });

    const deleted = await request(app).delete(`/todos/${created.body.id}`);
    expect(deleted.status).toBe(204);

    const getAfterDelete = await request(app).get(`/todos/${created.body.id}`);
    expect(getAfterDelete.status).toBe(404);
  });

  it('DELETE /todos/:id should return 404 for missing todo', async () => {
    const response = await request(app).delete('/todos/111');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Todo not found' });
  });

  it('should return 404 for unknown route', async () => {
    const response = await request(app).get('/unknown-route');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Route not found' });
  });
});
