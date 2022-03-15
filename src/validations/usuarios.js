import Joi from 'joi'

const schema = Joi.object(
    {
        email: Joi.string()
            .email()
            .required(),
        username: Joi.string()
            .max(15)
            .required(),
        password:Joi.string()
            .min(6)
            .max(15)
            .required(),
        firstname: Joi.string()
            .required(),
        lastname: Joi.string()
            .required(),
        avatar: Joi.string()
            .required()
    }
)

export default schema;

