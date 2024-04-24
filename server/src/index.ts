import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import express from 'express';
import { notFound, errorHandler } from './middelware';

//##########################################################################################
// EXPRESS SERVER
//##########################################################################################
const app = express();

app.use(
  cors(),
  helmet(),
  morgan('dev'),
  express.json(),
  express.urlencoded({ extended: true })
);

//##########################################################################################
// ROUTES
//##########################################################################################
app.get('/', (req, res) => res.send('Express SRC on Vercel'));

//##########################################################################################
// ROUTE ERROR CATCHERS
//##########################################################################################
app.use(notFound);
app.use(errorHandler);

app.listen(3000, () => console.log('Server ready on port 3000.'));

export default app;
