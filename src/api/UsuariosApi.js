import UsuariosDao from '../model/daos/UsuariosDao.js';
import UsuarioDto from '../model/dtos/UsuarioDto.js';

import logger from '../logger.js'
import { enviarCorreo } from './Mensajeria.js'

export default class UsuariosApi {

    constructor() {
        this.usuariosDao = new UsuariosDao();
    }

    async existeEmail(email) {
        try {
            await this.usuariosDao.getByEmail(email);
            return true;
        }
        catch (err) {
            if (err.estado == 404) return false;
            else throw err
        }
    }
    
    async existeUsername(username) {
        try {
            await this.usuariosDao.getByEmail(username);
            return true;
        }
        catch (err) {
            if (err.estado == 404) return false;
            else throw err
        }
    }

    async recuperar(email) {
        const data = await this.usuariosDao.getByEmail(email);
        return new UsuarioDto(data);
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

            const usuario = new UsuarioDto(data)

            usuario._id = await this.usuariosDao.add(usuario)

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
            const dto = await this.usuariosDao.addRole(email, role)
            return new UsuarioDto(dto);
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
            const dto = await this.usuariosDao.delRole(email, role)
            return new UsuarioDto(dto);
        }
        catch(err)
        {
            logger.error(`Error in Saving user: ${err}`);
            throw (err);
        }
    }

    async enviarMailNuevoRegistro(user) {

        const asunto = 'Nuevo usuario'
        let mailto
    
        try {
            const lista = await this.usuariosDao.listar({ admin: true });
    
            if (lista.count == 0)
                return;
    
            lista.forEach(element => {
    
                if (mailto == undefined)
                    mailto = element.email
                else
                    mailto = mailto + ',' + element.email
            });
    
            const cuerpo = `Estimados Admins <br/>le informamos un nuevo registro usuario <b>${user.username}</b> nombre <b>${user.firstName}</b><br/><br/> Atte. Obrero del bits`
            await enviarCorreo(mailto, asunto, cuerpo)
    
        } catch (err) { logger.error(`fallo el envio de mail error:${err}`) }
    }

}


