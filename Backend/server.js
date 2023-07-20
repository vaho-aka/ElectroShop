import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import colors from 'colors';

import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import mainRoutes from './routes/mainRoutes.js';

dotenv.config();

connectDB();

const app = express();
app.use(cors({ origin: 'http://localhost:5173/' }));
app.use(express.json());

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/uploads')));

app.get('/', (req, res) => {
  res.send('Api is running...');
});
app.use('/api/v1', mainRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.green
      .underline.bold
  )
);
