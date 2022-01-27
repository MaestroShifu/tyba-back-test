import { Response, Request, NextFunction } from 'express';
import ErrorHandler from '../../../utils/error-handler';
import { HttpStatusCode } from '../../../utils/status-code';
import logger from '../../logger/logger';

const log = logger('Error');

const middlewareError = (
  err: ErrorHandler,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) => {
  log('Internal error: %j', err);
  if (err instanceof ErrorHandler) {
    const error = {
      statusCode: err.statusCode,
      message: err.message
    };
    res.status(err.statusCode).send(error);
  }
  res
    .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
    .send('Upssss... lo sentimos');
};

export default middlewareError;
