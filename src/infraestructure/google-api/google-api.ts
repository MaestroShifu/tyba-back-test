import { Client, Place } from '@googlemaps/google-maps-services-js';
import config from '../config/config';

export type ResponsePlace = Partial<Place[]>;

const googleClient = new Client();

const searchRestaurantsGoogleAPI = async (
  lat: number,
  lng: number
): Promise<ResponsePlace> => {
  const response = await googleClient.placesNearby({
    params: {
      radius: 1500,
      location: {
        lng,
        lat
      },
      type: 'restaurant',
      key: config.GOOGLE_API
    }
  });
  return response.data.results;
};

export { searchRestaurantsGoogleAPI };
