import {
  Strategy,
  StrategyOptions,
  ExtractJwt,
  VerifyCallback
} from 'passport-jwt';
import env from '../config/config';
import { PayloadToken } from '../../domain/entities/user';
import findUserById from '../../domain/interactors/user/find-user-by-id';
import UserMongoDB from '../../interface/adapters/user-mongodb';
import ErrorsHandler from '../../interface/adapters/errors-handler';

const useCaseFindUserById = findUserById(
  new UserMongoDB(),
  new ErrorsHandler()
);

const startegyOptions: StrategyOptions = {
  secretOrKey: env.SECRET_KEY, // Secret key public
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() // See Extracting the JWT from the request for more details.
  // issuer: 'accounts.examplesoft.com' // If defined the token issuer (iss) will be verified against this value.
  // audience: 'yoursite.net' // If defined, the token audience (aud) will be verified against this value.
};

const vefifyToken: VerifyCallback = async (payload: PayloadToken, done) => {
  try {
    const user = await useCaseFindUserById(payload.sub);
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
};

const jwtStrategy = new Strategy(startegyOptions, vefifyToken);

export default { jwtStrategy };
