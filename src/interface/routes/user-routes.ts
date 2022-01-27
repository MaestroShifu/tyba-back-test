import { Router } from 'express';
import passport from 'passport';
import userController from '../controllers/user-controllers';

const userRoutes = Router({
  strict: true,
  caseSensitive: true
});

userRoutes.post('/register', userController.userRegister);
userRoutes.post('/login', userController.userLogin);
userRoutes.get(
  '/user/transactions',
  passport.authenticate('jwt', { session: false }),
  userController.listTransaction
);

export default userRoutes;
