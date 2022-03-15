import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import { SignUp, login } from '../../controller/usuarios.js'

passport.use('signup', new LocalStrategy({ passReqToCallback: true }, SignUp))

passport.use('login', new LocalStrategy(login));

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user)
});

function mwdIsAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.status(401).json({ error: 'Acceso no autorizado' })
  }
}

function mwdIsAdmin(req, res, next) {

  if (!req.user.admin) {
    res.status(403).json({ error: `${req.user.username} ruta no autorizada` })
  }
  else {
    next()
  }
}

export { passport, mwdIsAuth, mwdIsAdmin };