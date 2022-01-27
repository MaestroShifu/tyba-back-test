import { Coordinates } from '../entities/transaction';

export interface RestaurantContract<T = unknown> {
  searchByCoordinates(coordinates: Coordinates): Promise<T>;
}
