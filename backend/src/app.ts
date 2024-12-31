import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import errorHandler from './middlewares/error-handler';
import rareLimiter from './middlewares/rare-limit';
import { errorLogger, requestLogger } from './middlewares/loggers';
import { PORT, DB_ADDRESS } from './config';
import router from './routes';

const app = express();

mongoose.connect(DB_ADDRESS);
app.disable('x-powered-by');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use(requestLogger);

app.use('/', router);

app.use(errorLogger);
app.use(errorHandler);
app.use(rareLimiter);

app.listen(PORT, () => {
  console.log(`Beginning of listening port ${PORT.toString()}`);
});
