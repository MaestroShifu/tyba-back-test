import dotenv, { DotenvConfigOptions } from 'dotenv';
import path from 'path';

type VariablesEnv = 'dev' | 'prod' | 'test';

type Enviroment = {
  ENV_NODE: VariablesEnv;
  PORT: number;
  SECRET_KEY: string;
  DB_URL: string;
};

const urlPath = '../../../.env';

const configEnv: DotenvConfigOptions = {
  path: path.join(path.dirname(__filename), urlPath)
};
dotenv.config(configEnv);

const ENV_NODE: VariablesEnv = process.env.ENV_NODE
  ? (process.env.ENV_NODE as VariablesEnv)
  : 'dev';
const PORT: number = process.env.PORT ? +process.env.PORT : 3000;
const SECRET_KEY: string = process.env.SECRET_KEY || '';
const DB_URL: string = process.env.DB_URL || '';

const env: Enviroment = {
  ENV_NODE,
  PORT,
  SECRET_KEY,
  DB_URL
};

export default env;
