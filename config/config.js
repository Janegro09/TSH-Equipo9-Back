import dotenv from 'dotenv';
import path from 'path';
import { ExtractJwt as ExtractJWT } from 'passport-jwt';

dotenv.config({
  path: path.resolve(process.cwd()+'/config', process.env.NODE_ENV +'.env')
});

export default {
  NODE_ENV: process.env.NODE_ENV || 'development',
  HOST: process.env.HOST || 'localhost',
  PORT: process.env.PORT || 8000
}