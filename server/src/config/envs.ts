import 'dotenv/config';

export const envs = {
  PORT: parseInt(process.env.PORT || '3000'),
  CORS: process.env.CORS,
	DB_URL: process.env.DB_URL || '',
	JWY_KEY: process.env.JWY_KEY || '',
} 