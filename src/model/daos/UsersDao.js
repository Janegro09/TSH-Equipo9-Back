import ContainerDao from './ContainerDao.js';


export default class UsersDao extends ContainerDao {

  constructor() {
    super('users')
  }

  async getByEmail(email)
  {
    return super.getById({email:email})
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
