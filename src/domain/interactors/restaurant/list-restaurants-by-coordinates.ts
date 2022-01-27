import { ErrorContract } from '../../contracts/error-contracts';
import { RestaurantContract } from '../../contracts/restaurant-contracts';
import { Coordinates } from '../../entities/transaction';
import { validOnlyNumbers } from '../utils/validators';

type ListRestaurants = Omit<Coordinates, 'lat' | 'lng'> & {
  lat: string;
  lng: string;
};

const listRestaurantsByCoordinates =
  <T = unknown>(
    restaurantContract: RestaurantContract<T>,
    errorContract: ErrorContract
  ) =>
  async (coordinates: ListRestaurants): Promise<T> => {
    const { lat, lng } = coordinates;
    if (!(lat && validOnlyNumbers(lat.toString())))
      throw errorContract.errorBadRequest('The lat is invalid');
    if (!(lng && validOnlyNumbers(lng.toString())))
      throw errorContract.errorBadRequest('The lng is invalid');

    const restaurants = await restaurantContract.searchByCoordinates({
      lat: +lat,
      lng: +lng
    });

    return restaurants as T;
  };

export default listRestaurantsByCoordinates;
