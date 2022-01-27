export type Coordinates = {
  lat: number;
  lng: number;
};

export type Transaction = {
  _id: string;
  userId: string;
  coordinates: Coordinates;
  payload: unknown;
};
