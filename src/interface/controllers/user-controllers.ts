import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '../../utils/status-code';
import JwtBcryptAuth from '../adapters/jwt-bcrypt-auth';
import UserMongoDB from '../adapters/user-mongodb';
import TransactionMongoDB from '../adapters/transaction-mongodb';
import ErrorsHandler from '../adapters/errors-handler';
import loginAuth from '../../domain/interactors/auth/login-auth';
import userListTransaction from '../../domain/interactors/user/user-list-transaction';

const useCaseUserListTransaction = userListTransaction(
  new TransactionMongoDB()
);

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
    const user = await useCaseLoginAuth(req.body, true);
    res.status(HttpStatusCode.CREATED).send(user);
  } catch (error) {
    next(error);
  }
};

const userLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await useCaseLoginAuth(req.body, false);
    res.status(HttpStatusCode.OK).send(user);
  } catch (error) {
    next(error);
  }
};

const listTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id } = req.user as { _id: string };
    const transactions = await useCaseUserListTransaction(_id);
    res.status(HttpStatusCode.OK).send(transactions);
  } catch (error) {
    next(error);
  }
};

export default { userRegister, userLogin, listTransaction };
