import * as Joi from 'joi';

const validationSchema = Joi.object({
  // Environment config
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'staging')
    .insensitive() // allow case-insensitive values
    .default('development')
    .description('Application environment'),

  // Server settings
  SERVER_HOST: Joi.alternatives()
    .try(
      Joi.string().hostname(),
      Joi.string().ip({ version: ['ipv4', 'ipv6'] }),
    )
    .default('localhost')
    .description('Hostname or IP address to bind the server'),

  SERVER_PORT: Joi.number()
    .port()
    .default(3000)
    .description('Port number to listen on'),

  // Database connection details
  DB_HOST: Joi.alternatives()
    .try(
      Joi.string().hostname(),
      Joi.string().ip({ version: ['ipv4', 'ipv6'] }),
    )
    .required()
    .description('Database host'),

  DB_PORT: Joi.number().port().default(5432).description('Database port'),

  DB_USER: Joi.string().min(1).required().description('Database username'),

  DB_PASSWORD: Joi.string().min(8).required().description('Database password'),

  DB_NAME: Joi.string().min(1).required().description('Database name'),

  // JWT authentication
  JWT_SECRET: Joi.string().min(32).required().description('JWT secret key'),

  JWT_EXPIRATION: Joi.string()
    .pattern(/^\d+[smhd]$/) // e.g., 30m, 1h, 15d (seconds, minutes, hours, days)
    .default('1h')
    .description('JWT token expiration duration (e.g. 1h, 30m)'),

  JWT_ISSUER: Joi.string().required().description('JWT issuer'),

  JWT_AUDIENCE: Joi.string().required().description('JWT audience'),

  // Logger level
  LOG_LEVEL: Joi.string()
    .valid('error', 'warn', 'info', 'debug', 'verbose')
    .default('debug')
    .description('Logging level'),

  // CORS origin URL (must be a valid URI or array of URIs)
  CORS_ORIGIN: Joi.alternatives()
    .try(Joi.string().uri(), Joi.array().items(Joi.string().uri()))
    .default('http://localhost:4200')
    .description('Allowed CORS origin URL(s)'),

  // Email SMTP server configuration
  EMAIL_HOST: Joi.alternatives()
    .try(
      Joi.string().hostname(),
      Joi.string().ip({ version: ['ipv4', 'ipv6'] }),
    )
    .required()
    .description('SMTP email host'),

  EMAIL_PORT: Joi.number().port().default(587).description('SMTP email port'),
});

export default validationSchema;
