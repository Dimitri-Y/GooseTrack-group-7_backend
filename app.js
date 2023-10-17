import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import tasksRouter from './routes/api/tasks-router.js';
import reviewsRouter from './routes/api/reviews-router.js';
import statRouter from './routes/api/statistics-router.js';
import authRouter from './routes/api/auth-router.js';
import swaggerUi from 'swagger-ui-express';
import * as fs from 'fs';

const swaggerDocument = JSON.parse(fs.readFileSync('./swagger.json'));

// import swaggerDocument from "./swagger.json" assert { type: "json" };
dotenv.config();

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});
app.use('/api', authRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/tasks', tasksRouter);
app.use('/api/statistics', statRouter);
export default app;
