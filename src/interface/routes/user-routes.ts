import { Router } from 'express';
import userController from '../controllers/user-controllers';

const userRoutes = Router({
  strict: true,
  caseSensitive: true
});

userRoutes.post('/register', userController.userRegister);

export default userRoutes;
