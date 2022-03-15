import dotenv from 'dotenv';
import path from 'path';
import { ExtractJwt as ExtractJWT } from 'passport-jwt';

dotenv.config({
  path: path.resolve(process.cwd()+'/config', process.env.NODE_ENV +'.env')
});

export const jwtOpts ={
  secretOrKey: process.env.SECRET ||'TOP_SECRET',
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  ignoreExpiration: process.env.JWT_IGNORE_EXPIRE || false,
  expireIn: parseInt(process.env.JWT_TIME_EXPIRE) || 3600,
}

export const ServidorEnvioCorreo={
  host: process.env.MAIL_SMTP ,
  port: parseInt(process.env.MAIL_PORT),
  secure:false, 
  auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
  }
}

export default {
  NODE_ENV: process.env.NODE_ENV || 'development',
  HOST: process.env.HOST || 'localhost',
  PORT: process.env.PORT || 8000
}