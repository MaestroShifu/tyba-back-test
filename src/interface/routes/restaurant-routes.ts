import { Router } from 'express';
import restaurantController from '../controllers/restaurant-controller';

const restaurantRoutes = Router({
  strict: true,
  caseSensitive: true
});

restaurantRoutes.get('/restaurants', restaurantController.listRestaurants);

export default restaurantRoutes;
