import { RestaurantContract } from '../../domain/contracts/restaurant-contracts';
import { Coordinates } from '../../domain/entities/transaction';
import {
  searchRestaurantsGoogleAPI,
  ResponsePlace
} from '../../infraestructure/google-api/google-api';

class RestaurantsGoogleApi implements RestaurantContract<ResponsePlace> {
  async searchByCoordinates(coordinates: Coordinates) {
    const { lat, lng } = coordinates;
    const restaurants = await searchRestaurantsGoogleAPI(lat, lng);
    return restaurants;
  }
}

export default RestaurantsGoogleApi;
