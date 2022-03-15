import UsuariosApi from '../api/UsuariosApi.js'
import logger from '../logger.js'
import jwt from 'jsonwebtoken'
import { jwtOpts } from '../../config/config.js'
import schema from '../validations/usuarios.js'

const usuarios = new UsuariosApi();

export async function SignUp(req, email, password, done) {

    try {
        const data = await schema.validateAsync(req.body)
        const user = await usuarios.Agregar(data);

        done(null, user);
    }
    catch (err) {
        logger.warn(err)
        done(null, false)
    }
}

export async function login(email, password, done) {

    logger.info(`usuarios controller login email: ${email} `)

    try {
        const user = await usuarios.login(email, password)
        return done(null, user);
    }
    catch (error) {
        logger.error(error);
        return done(null, false);
    }

};

export async function responseToken(req, res) {
    const user = req.user;
    const token = jwt.sign({ user: user }, jwtOpts.secretOrKey, { expiresIn: jwtOpts.expireIn });

    res.status(200).json({ token })
}

export function validateToken(token, cb) {

    if (token.exp < Math.floor(Date.now() / 1000)) {
        logger.warn('token caducado')
        return cb(null, false)
    }
    else return cb(null, token.user);
}

export function getfailloginController(req, res) {
    res.status(401).json({ "descripcion": "username o contraseña incorrecta" })
}

export function getfailsignupController(req, res) {

    res.status(400).json({ descripcion: req.error })
}

export function getlogoutController(req, res) {
    req.session.destroy(err => {
        if (!err) res.status(200).json({ 'status': 'ok' })
        else res.status(500).send({ status: 'Logout ERROR', body: err })
    })
}

export function isAdmin(req, res, next) {
   
    let isAdmin = false
   
    req.user.roles.forEach(element => {
        if (element == 'Admin')
            isAdmin = true
    });

    if(isAdmin)
        next()
    else
        res.status(403).json({ error: `${req.user.username} ruta no autorizada` })
}

export async function AgregarRole(req, res) {
    const user = await usuarios.AgregarRole(req.body.email, req.body.role);
    res.status(201).json(user.get())
}

export async function EliminarRole(req, res) {
    const user = await usuarios.EliminarRole(req.body.email, req.body.role);
    res.status(204).json(user.get())
}


export async function validaUser(req, res, next) {
    let data
    try {
        data = await schema.validateAsync(req.body)
    }
    catch (err) {
        logger.warn(`Error al validaciones esquema de usuarios`)
        return res.status(400).json({ descripcion: err.details })
    }

    try {
        if (await usuarios.existeEmail(data.email)) {
            return res.status(400).json({ descripcion: 'El email ya esta registrado' })
        }

        if (await usuarios.existeUsername(data.username))
            return res.status(400).json({ descripcion: 'El username ya esta registrado' })
    }
    catch (err) {
        logger.error(`Error al ejecutar validaciones de usuarios ${err}`)
        return res.status(500).json({ descripcion: err })
    }

    next();

}

