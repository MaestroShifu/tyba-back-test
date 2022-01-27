import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '../../utils/status-code';
import JwtBcryptAuth from '../adapters/jwt-bcrypt-auth';
import UserMongoDB from '../adapters/user-mongodb';
import ErrorsHandler from '../adapters/errors-handler';
import loginAuth from '../../domain/interactors/auth/login-auth';

const useCaseLoginAuth = loginAuth(
  new UserMongoDB(),
  new JwtBcryptAuth(),
  new ErrorsHandler()
);

const userRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await useCaseLoginAuth(req.body);
    res.status(HttpStatusCode.CREATED).send(user);
  } catch (error) {
    next(error);
  }
};

export default { userRegister };
