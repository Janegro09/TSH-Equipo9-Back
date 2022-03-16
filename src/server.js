import express, { json, urlencoded } from 'express'
import passport from './controller/PassportLocal.js'
import DefaultRoutes from "./routes/default.js"
import UsersRoutes from './routes/users.js'
import MongoStore from 'connect-mongo'
import config from '../config/config.js'
import session from 'express-session';

const app = express()

app.use(json())
app.use(urlencoded({ extended: true }))


/**************************************************************************************** */
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }

app.use(session({
    /* ------------------------------------------------------------ */
    /*           Persistencia por mongo atlas database             */
    /* ------------------------------------------------------------ */
    store: MongoStore.create({
        //En Atlas connect App :  Make sure to change the node version to 2.2.12:
        mongoUrl: config.MONGO_SESSION_URL,
        mongoOptions: advancedOptions
    }),
    /* ------------------------------------------------------------ */

    secret: 'TecoHackathonEquipo9',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 600000
    }
}))

/**************************************************************************************** */
app.use(passport.initialize());
app.use(passport.session());
/**************************************************************************************** */

// rutas apiRestFull
app.use('/', UsersRoutes)

//rutas no encontrada
app.use('/*', DefaultRoutes)

export default app

