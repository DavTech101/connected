import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import express from 'express';
import treeDataRoutes from './routes/treeDataRoutes';
import { notFound, errorHandler } from './middelware';

dotenv.config();
//##########################################################################################
// EXPRESS SERVER
//##########################################################################################
const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors(),
  helmet(),
  express.json(),
  express.urlencoded({ extended: true })
);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//##########################################################################################
// ROUTES
//##########################################################################################
app.get('/', (req, res) => res.send('Server is running'));
app.get('/api', (req, res) => res.send('API is working'));

app.use('/api/treedata', treeDataRoutes);

//##########################################################################################
// ROUTE ERROR CATCHERS
//##########################################################################################
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));

export default app;
