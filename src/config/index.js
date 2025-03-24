import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

export const initConfig = () => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const env = process.env.NODE_ENV || 'development';
  const envPath = path.resolve(__dirname, `../../.env.${env}`);
  dotenv.config({ path: envPath });
};
