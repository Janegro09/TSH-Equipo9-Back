import UsersDao from '../model/daos/UsersDao.js';
import UserDto from '../model/dtos/UserDto.js';

import logger from '../logger.js'

export default class UsersApi {

    constructor() {
        this.usersDao = new UsersDao();
    }

    async existeEmail(email) {
        try {
            await this.usersDao.getByEmail(email);
            return true;
        }
        catch (err) {
            if (err.estado == 404) return false;
            else throw err
        }
    }
    
    async existeUsername(username) {
        try {
            await this.usersDao.getByEmail(username);
            return true;
        }
        catch (err) {
            if (err.estado == 404) return false;
            else throw err
        }
    }

    async recuperar(email) {
        const data = await this.usersDao.getByEmail(email);
        return new UserDto(data);
    }
    

    async ObtenerXEmail(email) {
        const usuario = await this.recuperar(email)
        return usuario.get();
    }

    async login(email, password){
        try{
            const usuario = await this.recuperar(email)

            if (!usuario.isValidPassword(password)) 
                return false
            else
                return usuario.get();
        }
        catch(err){
             logger.error(`fallo el login de mail error:${err}`)             
        }

    }

    async Agregar(data){
        try {

            const usuario = new UserDto(data)

            usuario._id = await this.usersDao.add(usuario)

            logger.info(`Registro Ok `);
    
            await this.enviarMailNuevoRegistro(usuario)
    
            return usuario.get();
        }
        catch (err) {
            logger.error(`Error in Saving user: ${err}`);
            throw (err);
        }
    }

    async AgregarRole(email, role)
    {
        try{
            const dto = await this.usersDao.addRole(email, role)
            return new UserDto(dto);
        }
        catch(err)
        {
            logger.error(`Error in Saving user: ${err}`);
            throw (err);
        }
    }
    
    async EliminarRole(email, role)
    {
        try{
            const dto = await this.usersDao.delRole(email, role)
            return new UserDto(dto);
        }
        catch(err)
        {
            logger.error(`Error in Saving user: ${err}`);
            throw (err);
        }
    }



}


