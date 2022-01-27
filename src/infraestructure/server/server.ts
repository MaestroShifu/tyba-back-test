import express, { urlencoded, json, Request, Response } from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import passport from 'passport';
import { HttpStatusCode } from '../../utils/status-code';
import userRoutes from '../../interface/routes/user-routes';
import middlewareError from './middleware/middleware-error';
import authStrategy from '../auth/auth-strategy';

passport.use(authStrategy.jwtStrategy);

const app = express();

app.use(helmet());
app.use(compression());
app.use(cors());
app.use(
  urlencoded({
    extended: false
  })
);
app.use(json());

app.get('/', (_req: Request, res: Response) => {
  res.status(HttpStatusCode.OK).send();
});
app.use(userRoutes);

/* app.get(
  '/secret',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json('Secret Data');
  }
); */

app.use(middlewareError);

export default app;
