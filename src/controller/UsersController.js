import UsersApi from '../api/UsersApi.js'
import logger from '../logger.js'
import schema from '../validations/users.js'

const users = new UsersApi();

export async function SignUpController(req, email, password, done) {
console.log('SignUpController')
    try {
        const data = await schema.validateAsync(req.body)
console.log(data)        
        const user = await users.add(data);

        done(null, user);
    }
    catch (err) {
        logger.warn(err)
        done(null, false)
    }
}

export async function LoginController(email, password, done) {

    logger.info(`usuarios controller login email: ${email} `)

    try {
        const user = await users.login(email, password)
        return done(null, user);
    }
    catch (error) {
        logger.error(error);
        return done(null, false);
    }

};

export function postLoginController(req, res) {
    res.status(200).json(req.user)
}

export function postSignupController(req, res) {
    res.status(200).json(req.user)
}

export function getfailloginController(req, res) {
    res.status(401).json({ "descripcion": "email o contraseña incorrecta" })
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

export async function AgregarRole(req, res) {
    const user = await users.AgregarRole(req.body.email, req.body.role);
    res.status(201).json(user.get())
}

export async function EliminarRole(req, res) {
    const user = await users.EliminarRole(req.body.email, req.body.role);
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

        if (await users.emailExists(data.email)) {
            return res.status(400).json({ descripcion: 'El email ya esta registrado' })
        }
    }
    catch (err) {
        logger.error(`Error al ejecutar validaciones de usuarios ${err}`)
        return res.status(500).json({ descripcion: err })
    }

    next();

}

export function mwdIsAuth(req, res, next) {
    if (req.isAuthenticated()) {
      next()
    } else {
      res.status(401).json({ error: 'Acceso no autorizado' })
    }
  }
  