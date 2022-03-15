import { Router } from 'express'
import passport from '../controller/passport.js'
import {validaUser} from '../controller/usuarios.js'

import { responseToken, getfailloginController, getfailsignupController, getlogoutController, AgregarRole, EliminarRole } from '../controller/usuarios.js'

const routesUsuarios = new Router();

routesUsuarios.post('/login',  passport.authenticate('login', {session: false, failureRedirect: '/faillogin' }), responseToken);

routesUsuarios.post('/signup', validaUser, passport.authenticate('signup', {session: false, failureRedirect: '/failsignup' }), responseToken)

routesUsuarios.get('/faillogin', getfailloginController)
routesUsuarios.get('/failsignup', getfailsignupController)

routesUsuarios.get('/logout', getlogoutController)

routesUsuarios.post('/usuarios/role', AgregarRole)
routesUsuarios.delete('/usuarios/role', EliminarRole)

export default routesUsuarios 



