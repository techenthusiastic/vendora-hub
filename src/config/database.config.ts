import { registerAs } from '@nestjs/config';
import { DatabaseConfig } from './types/database-config.type';

export default registerAs(
  'database',
  (): DatabaseConfig => ({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    name: process.env.DB_NAME || 'mydb',
  }),
);
