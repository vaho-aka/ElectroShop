import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import colors from 'colors';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
// import sendEmail from './utils/sendEmail.js';

import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import mainRoutes from './routes/mainRoutes.js';

dotenv.config();

connectDB();

const app = express();

// Set security HTTP headers
app.use(helmet());

// Limit requests from same API
const limiter = rateLimit({
  max: 10000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});

app.use('/', limiter);

app.use(cors({ origin: '*' }));

// Body parser, reading data from body into req.body
app.use(express.json());

// Data sanitization against NoSQL query injection, needs to be after the Body parser
app.use(mongoSanitize());

// Routes
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
