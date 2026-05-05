import { Router } from 'express';
import { z } from 'zod';
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  getTodoById,
  updateTodo
} from '../store/todoStore';
import { HttpError } from '../middleware/httpError';

const router = Router();

const idSchema = z.coerce.number().int().positive();

const createTodoSchema = z.object({
  title: z.string().trim().min(1, 'title is required').max(200, 'title must be at most 200 chars')
});

const updateTodoSchema = z
  .object({
    title: z.string().trim().min(1, 'title cannot be empty').max(200).optional(),
    completed: z.boolean().optional()
  })
  .refine((body) => Object.keys(body).length > 0, {
    message: 'At least one field is required'
  });

router.get('/', (_req, res) => {
  res.json(getAllTodos());
});

router.get('/:id', (req, res, next) => {
  try {
    const id = idSchema.parse(req.params.id);
    const todo = getTodoById(id);

    if (!todo) {
      throw new HttpError(404, 'Todo not found');
    }

    res.json(todo);
  } catch (error) {
    next(error);
  }
});

router.post('/', (req, res, next) => {
  try {
    const body = createTodoSchema.parse(req.body);
    const todo = createTodo(body.title);
    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', (req, res, next) => {
  try {
    const id = idSchema.parse(req.params.id);
    const body = updateTodoSchema.parse(req.body);

    const todo = updateTodo(id, body);

    if (!todo) {
      throw new HttpError(404, 'Todo not found');
    }

    res.json(todo);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', (req, res, next) => {
  try {
    const id = idSchema.parse(req.params.id);
    const deleted = deleteTodo(id);

    if (!deleted) {
      throw new HttpError(404, 'Todo not found');
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
