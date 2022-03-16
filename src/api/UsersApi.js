import UsersDao from '../model/daos/UsersDao.js';
import UserDto from '../model/dtos/UserDto.js';

import logger from '../logger.js'

export default class UsersApi {

    constructor() {
        this.usersDao = new UsersDao();
    }

    async emailExists(email) {
        try {
            await this.usersDao.getByEmail(email);
            return true;
        }
        catch (err) {
            if (err.estado == 404) return false;
            else throw err
        }
    }
    


    async get(email) {
        const data = await this.usersDao.getByEmail(email);
        return new UserDto(data);
    }
    

    async login(email, password){
        try{
            const usuario = await this.get(email)

            if (!usuario.isValidPassword(password)) 
                return false
            else
                return usuario.get();
        }
        catch(err){
             logger.error(`fallo el login de mail error:${err}`)             
        }

    }

    async add(data){
        try {

            const usuario = new UserDto(data)
console.log(usuario)
            usuario._id = await this.usersDao.add(usuario)

            logger.info(`Registro Ok `);
    
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


