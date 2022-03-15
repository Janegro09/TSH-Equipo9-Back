import logger from './logger.js'
import app from './server.js'
import config from '../config/config.js'

const PORT = config.PORT

const server = app.listen(PORT, () => {
    logger.info(`Servidor http escuchando en el puerto ${server.address().port}`)
})



server.on("error", error => logger.error(`Error en servidor ${error}`))

