import ContenedorDao from './ContenedorDao.js';


export default class UsuariosDao extends ContenedorDao {

  constructor() {
    super('usuarios')
  }

  async getByEmail(email)
  {
    return super.getById({email:email})
  }

  async getByUsername(username)
  {
    return super.getById({username:username})
  }

  async addRole(email, role) {

    await this.collection.updateOne(
      { email: email },
      {'$push': { roles: role } })

    return await super.getById({email:email})
  }

  async delRole(email, role) {

    await this.collection.updateOne(
      { email: email },
      { '$pull': { roles:  { $eq: role }  } })

    return await super.getById({email:email})

  }

}
