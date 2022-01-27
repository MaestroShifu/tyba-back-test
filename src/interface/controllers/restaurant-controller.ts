import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '../../utils/status-code';
import RestaurantsGoogleApi from '../adapters/restaurants-google-api';
import TransactionMongoDB from '../adapters/transaction-mongodb';
import ErrorsHandler from '../adapters/errors-handler';
import listRestaurantsByCoordinates from '../../domain/interactors/restaurant/list-restaurants-by-coordinates';
import createTransaction from '../../domain/interactors/transaction/create-transaction';
import { ResponsePlace } from '../../infraestructure/google-api/google-api';

const useCaseCreateTransaction = createTransaction(new TransactionMongoDB());

const useCaseListRestaurantsByCoordinates =
  listRestaurantsByCoordinates<ResponsePlace>(
    new RestaurantsGoogleApi(),
    new ErrorsHandler()
  );

const listRestaurants = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { lat, lng } = req.query;
    const { _id } = req.user as { _id: string };
    const restaurants = await useCaseListRestaurantsByCoordinates({
      lat: lat as string,
      lng: lng as string
    });
    await useCaseCreateTransaction({
      userId: _id,
      coordinates: {
        lat: +(lat as string),
        lng: +(lng as string)
      },
      payload: restaurants
    });
    res.status(HttpStatusCode.OK).send(restaurants);
  } catch (error) {
    next(error);
  }
};

export default { listRestaurants };
