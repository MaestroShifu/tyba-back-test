import { Response, Request, NextFunction } from 'express';
import ErrorHandler from '../../../utils/error-handler';
import logger from '../../logger/logger';

const log = logger('Error');

const middlewareError = (
  err: ErrorHandler,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) => {
  const error = {
    statusCode: err.statusCode,
    message: err.message
  };
  log('Internal error: %j', error);
  res.status(err.statusCode).send(error);
};

export default middlewareError;
