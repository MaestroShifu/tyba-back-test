import mongoose from 'mongoose';
import logger from '../logger/logger';
import env from '../config/config';

const log = logger('MongoDB');

class MongoDb {
  private connection?: typeof mongoose;
  constructor(public dbName: string) {}

  private validConnection() {
    if (!this.connection) {
      log('There is no connection: [%s]', env.DB_URL);
      throw new Error('Connection not found');
    }
    return this.connection;
  }

  public async createConnectionDB() {
    try {
      this.connection = await mongoose.connect(env.DB_URL, {
        dbName: this.dbName,
        maxPoolSize: 10, // Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000 // Close sockets after 45 seconds of inactivity
      });
      log('The database connected successfully: [%s]', env.DB_URL);
    } catch (error) {
      log('Connection to the database failed: [%j]', error);
      throw new Error('Connection to the database failed');
    }
  }

  public async closeConnection() {
    try {
      await this.validConnection().disconnect();
    } catch (error) {
      log('Error closing the connection: [%j]', error);
      throw new Error('Error closing the connection');
    }
  }
}

export default MongoDb;
