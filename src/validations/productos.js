import Joi from 'joi'

const schema = Joi.object(
    {
        nombre: Joi.string()
            .required(),
        descripcion: Joi.string()
            .required(),
        precio: Joi.number()
            .precision(2)
            .positive()
            .required(),
        stock: Joi.number()
            .integer()
            .positive()
            .required(),
        categoria: Joi.string(),
        caracteristicas: Joi.array().items( Joi.object(
            {tipo: Joi.string().required(), valor: Joi.string().required() }
            )
        )
    }
)

export default schema;

