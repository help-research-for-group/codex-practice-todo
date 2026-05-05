import express from 'express';
import todoRoutes from './routes/todos';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

const app = express();

app.use(express.json());
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});
app.use('/todos', todoRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
