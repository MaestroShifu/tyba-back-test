import app from './src/infraestructure/server/server';
import MongoDb from './src/infraestructure/mongodb/mongo-db';
import logger from './src/infraestructure/logger/logger';
import env from './src/infraestructure/config/config';

const log = logger('Index');

const mongoDB = new MongoDb('db_basic');

const server = app.listen(env.PORT, async () => {
  log('Successful start server %d', env.PORT);
  await mongoDB.createConnectionDB();
});

const closeServer = (event: NodeJS.Signals) => {
  log('%s signal received, closing http server', event);
  server.close(async (err) => {
    await mongoDB.closeConnection();
    err ? log('Http server closed: %j', err) : log('Http server closed');
    process.exit(err ? 1 : 0);
  });
};

process.on('SIGTERM', () => {
  closeServer('SIGTERM');
});

process.on('SIGINT', async () => {
  closeServer('SIGINT');
});
