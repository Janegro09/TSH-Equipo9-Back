import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(process.cwd()+'/config', process.env.NODE_ENV +'.env')
});


export default {
  NODE_ENV: process.env.NODE_ENV || 'development',
  HOST: process.env.HOST || 'localhost',
  PORT: process.env.PORT || 8000,
  MONGO_URL: process.env.MONGO_URL||'noURL',
  MONGO_DB: process.env.MONGO_BASE||'hackaton',
  MONGO_SESSION_URL: process.env.SESSION_URL||'noURL'
}