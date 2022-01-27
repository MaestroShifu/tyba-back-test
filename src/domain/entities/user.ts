export type User = {
  _id: string;
  email: string;
  name: string;
  lastName: string;
  phone?: string;
  password: string;
};

export type PayloadToken = {
  sub: string; // ID
  iss: string; // User name - email - name or lastname
  iat: number; // Timestamp create token
};
